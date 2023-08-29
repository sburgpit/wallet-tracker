import { cn } from 'shared/lib/utils/classNames'
import css from './Select.module.scss'
import { Text } from '../Text'
import { useEffect, useRef, useState } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import { useOnClickOutside } from 'shared/lib/hooks'
import { Shimmer } from '../Shimmer'

type SelectOption =
  | {
      label: string
      value: string | number
      search?: string
    }
  | string

type SelectProps = {
  label: string
  options: SelectOption[] | undefined
  error?: string
  disabled?: boolean
  className?: string
  hasMany?: boolean
  defaultValue?: string | number
  isLoading?: boolean
  onChange?: (value: (string | number)[] | null) => void
}

const normalizeOption = (option: SelectOption): { label: string; value: string | number; search?: string } =>
  typeof option === 'string' ? { label: option, value: option } : option

export const Select = (props: SelectProps) => {
  const { options, error, disabled, className, defaultValue, hasMany, label, isLoading } = props
  const [selectValue, setSelectValue] = useState<(string | number)[]>(defaultValue ? [defaultValue] : [])
  const [search, setSearch] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [maxHeight, setMaxHeight] = useState<number>()
  const selectRef = useRef<HTMLDivElement | null>(null)
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  useOnClickOutside(selectRef, () => setIsOpen(false))

  useEffect(() => {
    if (isOpen && selectRef.current) {
      if (selectRef?.current) {
        const distanceFromTop = selectRef.current.getBoundingClientRect().top
        const viewportHeight = window.innerHeight
        const availableSpace = viewportHeight - distanceFromTop - 60
        setMaxHeight(availableSpace)
      }

      if (searchInputRef?.current) searchInputRef.current.focus()
    } else {
      setTimeout(() => {
        setSearch('')
        setMaxHeight(undefined)
      }, 300)
    }
  }, [isOpen])

  const changeHandler = (optionValue: string | number) => {
    if (hasMany) {
      setSelectValue((prev) =>
        prev.includes(optionValue) ? prev.filter((val) => val !== optionValue) : [...prev, optionValue]
      )
      return
    }
    setIsOpen(false)
    setSelectValue([optionValue])
  }

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value.toLowerCase())
  const toggleOpen = () => setIsOpen((prev) => !prev)

  const renderOptions = () => {
    const filteredOptions = options?.filter((option) => {
      if (!search) return true
      const { label, value, search: optionSearch } = normalizeOption(option)
      const searchFields = [
        label.toLocaleLowerCase(),
        `${value}`.toLocaleLowerCase(),
        optionSearch?.toLocaleLowerCase(),
      ]
      return searchFields.some((field) => field?.includes(search.trim().toLocaleLowerCase()))
    })

    if (!filteredOptions?.length) {
      return <div className={cn(css.SelectOptions__Item, css.SelectOptions__Item_notFound)}>Nothing found</div>
    } else {
      return filteredOptions.map((option) => {
        const { label, value } = normalizeOption(option)
        const isActive = selectValue.includes(value)
        return (
          <div
            key={value.toString()}
            className={cn(css.SelectOptions__Item, {
              [css.SelectOptions__Item_isActive]: isActive,
            })}
            onClick={() => changeHandler(value)}>
            {label}
          </div>
        )
      })
    }
  }

  if (isLoading) return <Shimmer height={36} width={'100%'} />

  return (
    <div className={cn(className, css.Select, { [css.Select_disabled]: disabled })} ref={selectRef}>
      <div
        className={cn(css.SelectButton, {
          [css.SelectButton_isOpen]: isOpen,
          [css.SelectButton_hasValue]: selectValue.length,
        })}
        onClick={toggleOpen}>
        <span className={css.SelectButton__Label}>{label}</span>
        <div className='rel w100 h100'>
          {selectValue.length > 0 && <span className={css.SelectButton__Value}>{selectValue.join(', ')}</span>}
          {isOpen && (
            <input
              value={search}
              placeholder={'Search...'}
              onChange={onSearchChange}
              className={css.SelectButton__Search}
              onClick={(e) => e.stopPropagation()}
              ref={searchInputRef}
            />
          )}
        </div>
        <div
          className={css.SelectButton__Indicator}
          onClick={(e) => {
            e.stopPropagation()
            toggleOpen()
          }}>
          <SlArrowDown />
        </div>
      </div>
      {error && (
        <Text color='dangerous' tag='span' size='small'>
          {error}
        </Text>
      )}
      <div
        className={cn(css.SelectOptions, { [css.SelectOptions_isOpen]: isOpen })}
        style={{ maxHeight: `${maxHeight}px` }}>
        {renderOptions()}
      </div>
    </div>
  )
}

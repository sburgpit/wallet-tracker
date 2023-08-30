import { cn } from 'shared/lib/utils/classNames'
import css from './Select.module.scss'
import { ErrorText } from '../Text'
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
  searchable?: boolean
  onChange?: (value: (string | number)[] | null) => void
}

const normalizeOption = (option: SelectOption): { label: string; value: string | number; search?: string } =>
  typeof option === 'string' ? { label: option, value: option } : option

export const Select = (props: SelectProps) => {
  const { options, error, disabled, className, defaultValue, hasMany, label, isLoading, searchable, onChange } = props
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

      if (searchInputRef?.current && searchable) searchInputRef.current.focus()
    } else {
      setTimeout(() => {
        setSearch('')
        setMaxHeight(undefined)
      }, 300)
    }
  }, [isOpen, searchable])

  useEffect(() => {
    onChange?.(selectValue)
  }, [selectValue])

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

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)
  const toggleOpen = () => setIsOpen((prev) => !prev)

  const renderOptions = () => {
    const filteredOptions = options?.filter((option) => {
      if (!searchable || !search) return true
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
          [css.SelectButton_searchable]: searchable,
        })}
        onClick={toggleOpen}>
        <span className={css.SelectButton__Label}>{label}</span>
        <div className='rel w100 h100'>
          {selectValue.length > 0 && <span className={css.SelectButton__Value}>{selectValue.join(', ')}</span>}
          {isOpen && searchable && (
            <input
              value={search}
              placeholder={'Search...'}
              onChange={onSearchChange}
              className={css.SelectButton__Search}
              onClick={(e) => e.stopPropagation()}
              ref={searchInputRef}
              onFocus={(event) => {
                event.currentTarget.scrollIntoView({ block: 'start' })
              }}
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
      {error && <ErrorText>{error}</ErrorText>}
      <div
        className={cn(css.SelectOptions, { [css.SelectOptions_isOpen]: isOpen })}
        style={{ maxHeight: `${maxHeight}px` }}>
        {renderOptions()}
      </div>
    </div>
  )
}

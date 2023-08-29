import { cn } from 'shared/lib/utils/classNames'
import css from './Select.module.scss'
import { Text } from '../Text'
import { useRef, useState } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import { useOnClickOutside } from 'shared/lib/hooks'

type SelectOption =
  | {
      label: string
      value: string | number
    }
  | string

type SelectProps = {
  label: string
  options: SelectOption[]
  error?: string
  disabled?: string
  className?: string
  hasMany?: boolean
  defaultValue?: string | number
  onChange?: (value: (string | number)[] | null) => void
}

export const Select = (props: SelectProps) => {
  const { options, error, disabled, className, defaultValue, hasMany, label } = props
  const [value, setValue] = useState<(string | number)[]>(() => (defaultValue ? [defaultValue] : []))
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const selectRef = useRef<HTMLDivElement | null>(null)

  const changeHandler = (optionValue: string | number) => {
    console.log(optionValue)
    if (hasMany) {
      if (value.some((val) => optionValue === val)) {
        setValue((prev) => prev.filter((val) => val !== optionValue))
      } else {
        setValue((prev) => [...prev, optionValue])
      }
    } else {
      setIsOpen(false)
      setValue([optionValue])
    }
  }

  useOnClickOutside(selectRef, () => setIsOpen(false))

  const classNames = cn(className, css.Select, { [css.Select_disabled]: disabled })

  return (
    <div className={classNames} ref={selectRef}>
      <div
        className={cn(css.SelectButton, { [css.SelectButton_isOpen]: isOpen })}
        onClick={() => setIsOpen((prev) => !prev)}>
        {value.length ? (
          <span className={css.SelectButton__Value}>{value.join(', ')}</span>
        ) : (
          <span className={css.SelectButton__Label}>{label || 'Empty'}</span>
        )}

        <div className={css.SelectButton__Indicator}>{<SlArrowDown />}</div>
      </div>
      {error && (
        <Text color='dangerous' tag='span' size='small'>
          {error}
        </Text>
      )}
      <div className={cn(css.SelectOptions, { [css.SelectOptions_isOpen]: isOpen })}>
        {options.map((option) => (
          <div
            className={css.SelectOptions__Item}
            onClick={() => changeHandler(typeof option === 'string' ? option : option.value)}>
            {typeof option === 'string' ? option : option.label}
          </div>
        ))}
      </div>
    </div>
  )
}

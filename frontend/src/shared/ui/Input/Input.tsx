import css from './Input.module.scss'
import { ErrorText, Text } from '../Text'
import { cn } from 'shared/lib/utils/classNames'
import { forwardRef, useState } from 'react'

type InputProps = JSX.IntrinsicElements['input'] & {
  label: string
  error?: string
  type?: 'password' | 'email' | 'text' | 'number'
  onChange?: (value: string | undefined) => void
  defaultValue?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type = 'text', label, error, className, id, disabled, placeholder, onChange, defaultValue, ...other } = props
  const [value, setValue] = useState<string | undefined>(() => defaultValue)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setValue(value)
    onChange?.(value)
  }

  return (
    <div>
      <div
        className={cn(className, css.Input, {
          [css.Input_disabled]: disabled,
          [css.Input_hasValue]: value !== undefined,
        })}>
        {label && (
          <label className={css.Input__Label} htmlFor={id}>
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          value={value}
          disabled={disabled}
          placeholder={placeholder || ''}
          onChange={changeHandler}
          onFocus={(event) => {
            setTimeout(() => {
              event.currentTarget.scrollIntoView({ block: 'end' })
            }, 300)
            other.onFocus?.(event)
          }}
          {...other}
          ref={ref}
        />
      </div>
      {error && <ErrorText className={css.Input__Error}>{error}</ErrorText>}
    </div>
  )
})

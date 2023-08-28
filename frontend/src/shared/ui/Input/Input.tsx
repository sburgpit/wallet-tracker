import css from './Input.module.scss'
import { Text } from '../Text'
import { cn } from 'shared/lib/utils/classNames'
import { forwardRef } from 'react'

type InputProps = JSX.IntrinsicElements['input'] & {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, error, className, id, disabled, value = '' } = props
  return (
    <div>
      <div className={cn(className, css.Input, { [css.Input_disabled]: disabled })}>
        <input value={value} placeholder='' {...props} ref={ref} />
        {label && (
          <label className={css.Input__Label} htmlFor={id}>
            {label}
          </label>
        )}
      </div>
      {error && (
        <Text className={css.Input__Error} color='dangerous' tag='span' size='small'>
          {error}
        </Text>
      )}
    </div>
  )
})

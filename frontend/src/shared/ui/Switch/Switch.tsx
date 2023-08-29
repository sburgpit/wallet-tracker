import { useState } from 'react'
import css from './Switch.module.scss'
import { cn } from 'shared/lib/utils/classNames'
import { ErrorText } from '../Text'

type SwitchProps = {
  defaultValue?: boolean
  onChange?: (value: boolean) => void
  label?: string
  className?: string
  error?: string
  disabled?: boolean
}

export const Switch = (props: SwitchProps) => {
  const { defaultValue = false, label, className, onChange, error, disabled } = props
  const [value, setValue] = useState<boolean>(() => defaultValue)

  const changeHandler = () => {
    setValue((prev) => !prev)
    onChange?.(!value)
  }

  return (
    <div>
      <div className={cn(className, css.Switch, { [css.Switch_disabled]: disabled })} onClick={changeHandler}>
        {label && <span className={css.Switch__Label}>{label}</span>}
        <button className={cn(css.Switch__Slider, { [css.Switch__Slider_checked]: value })} type='button' />
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  )
}

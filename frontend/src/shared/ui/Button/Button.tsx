import { cn } from 'shared/lib/utils/classNames'
import css from './Button.module.scss'
import { Loader } from '../Loader'

type ButtonProps = JSX.IntrinsicElements['button'] & {
  size?: 'large' | 'medium' | 'small'
  variant?: 'default'
  color?: 'default'
  loading?: boolean
}

export const Button = (props: ButtonProps) => {
  const {
    children,
    className,
    size = 'medium',
    variant = 'default',
    color = 'default',
    loading,
    type = 'button',
    ...otherProps
  } = props

  const classNames = cn(
    className,
    css.Button,
    css[`Button_variant_${variant}`],
    css[`Button_color_${color}`],
    css[`Button_size_${size}`]
  )

  return (
    <button className={classNames} type={type} {...otherProps}>
      {loading ? <Loader /> : children}
    </button>
  )
}

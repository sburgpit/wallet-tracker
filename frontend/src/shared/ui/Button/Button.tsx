import { cn } from 'shared/lib/utils/classNames'
import css from './Button.module.scss'
import { Loader } from '../Loader'
import { Link, LinkProps } from 'react-router-dom'

export type ButtonColors = 'primary' | 'second' | 'transparent' | 'hint' | 'dangerous'
export type ButtonVariants = 'default'
export type ButtonSizes = 'large' | 'medium' | 'small'

type BaseButtonProps = {
  size?: ButtonSizes
  variant?: ButtonVariants
  color?: ButtonColors
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  children?: React.ReactNode
  isActive?: boolean
}

type ButtonElementProps = JSX.IntrinsicElements['button'] & BaseButtonProps

type LinkElementProps = {
  to: string
} & Omit<LinkProps, 'to'> &
  BaseButtonProps

export type ButtonProps = ButtonElementProps | LinkElementProps

export const Button = (props: ButtonProps) => {
  const {
    children,
    className,
    size = 'medium',
    variant = 'default',
    color = 'primary',
    loading,
    icon,
    iconPosition = 'right',
    isActive,
    ...otherProps
  } = props

  const classNames = cn(
    className,
    css.Button,
    css[`Button_variant_${variant}`],
    css[`Button_color_${color}`],
    css[`Button_size_${size}`],
    { [css.Button_iconOnly]: !children && icon },
    { [css.Button_isActive]: isActive }
  )

  const Children = () => (
    <>
      {!loading && iconPosition === 'left' && icon}
      {loading ? <Loader /> : children}
      {!loading && iconPosition === 'right' && icon}
    </>
  )

  if ('to' in props) {
    const { to, onClick, ...linkProps } = otherProps as LinkElementProps
    return (
      <Link className={classNames} to={to} {...linkProps} onClick={onClick}>
        <Children />
      </Link>
    )
  } else {
    const { type = 'button', onClick, ...buttonProps } = otherProps as ButtonElementProps
    return (
      <button className={classNames} type={type} onClick={onClick} {...buttonProps}>
        <Children />
      </button>
    )
  }
}

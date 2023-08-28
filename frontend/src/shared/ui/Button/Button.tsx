import { cn } from 'shared/lib/utils/classNames'
import css from './Button.module.scss'
import { Loader } from '../Loader'
import { Link, LinkProps } from 'react-router-dom'

type BaseButtonProps = {
  size?: 'large' | 'medium' | 'small'
  variant?: 'default'
  color?: 'primary' | 'second' | 'transparent'
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  children?: React.ReactNode
}

type ButtonElementProps = JSX.IntrinsicElements['button'] & BaseButtonProps

type LinkElementProps = {
  to: string
} & Omit<LinkProps, 'to'> &
  BaseButtonProps

type ButtonProps = ButtonElementProps | LinkElementProps

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
    ...otherProps
  } = props

  const classNames = cn(
    className,
    css.Button,
    css[`Button_variant_${variant}`],
    css[`Button_color_${color}`],
    css[`Button_size_${size}`],
    { [css.Button_iconOnly]: !children && icon }
  )

  const Children = () => (
    <>
      {!loading && iconPosition === 'left' && icon}
      {loading ? <Loader /> : children}
      {!loading && iconPosition === 'right' && icon}
    </>
  )

  if ('to' in props) {
    const { to, ...linkProps } = otherProps as LinkElementProps
    return (
      <Link className={classNames} to={to} {...linkProps}>
        <Children />
      </Link>
    )
  } else {
    const { type = 'button', ...buttonProps } = otherProps as ButtonElementProps
    return (
      <button className={classNames} type={type} {...buttonProps}>
        <Children />
      </button>
    )
  }
}

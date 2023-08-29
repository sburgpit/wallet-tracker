import { cn } from 'shared/lib/utils/classNames'
import css from './Text.module.scss'

type TextProps = {
  className?: string
  tag?: `h${1 | 2 | 3 | 4 | 5 | 6}` | 'p' | 'span'
  font?: 'primary' | 'second'
  weight?: 400 | 500 | 700
  color?: 'primary' | 'link' | 'hint' | 'button' | 'dangerous' | 'warning' | 'success'
  size?: 'large' | 'medium' | 'small' | 'title'
  style?: React.CSSProperties
  children?: React.ReactNode
}

export const Text = (props: TextProps) => {
  const {
    className,
    tag = 'p',
    font = 'primary',
    weight = 400,
    color = 'primary',
    size = 'medium',
    style,
    children,
  } = props

  const Component = tag as keyof JSX.IntrinsicElements

  const classNames = cn(
    className,
    css.Text,
    css[`Text_font_${font}`],
    css[`Text_weight_${weight}`],
    css[`Text_color_${color}`],
    css[`Text_size_${size}`]
  )

  return (
    <Component className={classNames} style={style}>
      {children}
    </Component>
  )
}

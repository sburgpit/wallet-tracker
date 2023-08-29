import css from './Header.module.scss'

type HeaderProps = {
  children: React.ReactNode
}

export const Header = (props: HeaderProps) => {
  const { children } = props
  return <header className={css.Header}>{children}</header>
}

import { Header } from 'shared/ui/Header'
import css from './Page.module.scss'

type PageProps = {
  children: React.ReactNode
}

export const Page = (props: PageProps) => {
  const { children } = props
  return <div className={css.Page}>{children}</div>
}

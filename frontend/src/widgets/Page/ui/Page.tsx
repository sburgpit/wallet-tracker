import { Header } from 'shared/ui/Header'
import css from './Page.module.scss'

type PageProps = {
  children: React.ReactNode
  header?: React.ReactNode
}

export const Page = (props: PageProps) => {
  const { children, header } = props
  return (
    <>
      {header && <Header>{header}</Header>}
      <div className={css.Page}>{children}</div>
    </>
  )
}

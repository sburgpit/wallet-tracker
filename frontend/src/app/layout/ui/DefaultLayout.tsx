import { Outlet } from 'react-router-dom'
import { Navigation } from 'widgets/Navigation'
import css from './DefaultLayout.module.scss'

export const DefaultLayout = () => {
  return (
    <div className={css.DefaultLayout}>
      <Navigation />
      <main className={css.DefaultLayout__Main}>
        <Outlet />
      </main>
    </div>
  )
}

import { Outlet } from 'react-router-dom'
import { Navigation } from 'widgets/Navigation'
import css from './DefaultLayout.module.scss'

export const DefaultLayout = () => {
  return (
    <div className={css.DefaultLayout}>
      <main className={css.DefaultLayout__Main}>
        <Outlet />
      </main>
      <menu className={css.DefaultLayout__Menu}>
        <Navigation />
      </menu>
    </div>
  )
}

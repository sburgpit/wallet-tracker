import { Outlet } from 'react-router-dom'
import { Navigation } from 'widgets/Navigation'
import css from './DefaultLayout.module.scss'
import { useTelegram } from 'entities/telegram'

export const DefaultLayout = () => {
  const { viewportheight } = useTelegram()

  return (
    <div className={css.DefaultLayout} style={{ height: viewportheight }}>
      <main className={css.DefaultLayout__Main}>
        <Outlet />
      </main>
      <menu className={css.DefaultLayout__Menu}>
        <Navigation />
      </menu>
    </div>
  )
}

import { Outlet } from 'react-router-dom'
import { Navigation } from 'widgets/Navigation'
import css from './DefaultLayout.module.scss'
import { useTelegram } from 'entities/telegram'

export const DefaultLayout = () => {
  const { viewportStableHeight } = useTelegram()

  return (
    <div className={css.DefaultLayout} style={{ height: viewportStableHeight }}>
      <main className={css.DefaultLayout__Main}>
        <Outlet />
      </main>
      <menu className={css.DefaultLayout__Menu}>
        <Navigation />
      </menu>
    </div>
  )
}

import { Outlet } from 'react-router-dom'
import { Navigation } from 'widgets/Navigation'

export const DefaultLayout = () => {
  return (
    <>
      <menu>
        <Navigation />
      </menu>
      <main>
        <Outlet />
      </main>
    </>
  )
}

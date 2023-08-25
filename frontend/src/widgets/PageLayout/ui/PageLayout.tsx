import { LogoutButton } from 'features/auth/logout'
import { Outlet } from 'react-router-dom'

export const PageLayout = () => {
  return (
    <div>
      Page Layout <br />
      <Outlet />
      <LogoutButton />
    </div>
  )
}

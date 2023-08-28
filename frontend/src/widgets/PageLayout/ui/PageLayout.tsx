import { LogoutButton } from 'features/auth/logout'
import { Outlet } from 'react-router-dom'

export const PageLayout = () => {
  return (
    <div>
      <Outlet />
      <LogoutButton />
    </div>
  )
}

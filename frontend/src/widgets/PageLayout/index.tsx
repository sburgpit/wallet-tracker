import { LogoutButton } from 'features/auth/logout'
import { Outlet } from 'react-router-dom'

const PageLayout = () => {
  return (
    <div>
      Page Layout 2 <br />
      <Outlet />
      <LogoutButton />
    </div>
  )
}

export default PageLayout

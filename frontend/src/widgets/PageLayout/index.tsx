import { LogoutButton } from 'features/auth/logout'
import { Outlet } from 'react-router-dom'

const PageLayout = () => {
  return (
    <div>
      Root Layout <br />
      <Outlet />
      <LogoutButton />
    </div>
  )
}

export default PageLayout

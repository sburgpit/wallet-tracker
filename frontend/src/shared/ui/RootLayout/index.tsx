import { Outlet } from 'react-router-dom'

const RootLayout = () => {

  console.log(Telegram.WebApp)

  return (
    <div>
      Root Layout <br />
      <Outlet />
    </div>
  )
}

export default RootLayout

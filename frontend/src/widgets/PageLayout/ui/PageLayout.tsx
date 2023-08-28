import { useTelegram } from 'entities/telegram'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { PageLoader } from 'widgets/PageLoader'

export const PageLayout = () => {
  const { viewport, viewportStable } = useTelegram()

  return (
    <main>
      <span>vh: {viewport}</span>
      <br />
      <span>vsh: {viewportStable}</span>
      <Outlet />
    </main>
  )
}

import { useTelegram } from 'entities/telegram'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { PageLoader } from 'widgets/PageLoader'

export const PageLayout = () => {
  const [view, setView] = useState<number>()
  const [viewS, setViewS] = useState<number>()

  const { viewport, viewportStable, onEvent, offEvent } = useTelegram()

  function viewportChangeHandler() {
    console.log(this as unknown)
  }

  useEffect(() => {
    onEvent('viewportChanged', viewportChangeHandler)
    return () => offEvent('viewportChanged', viewportChangeHandler)
  })

  return (
    <main>
      <span>vh: {view}</span>
      <br />
      <span>vsh: {viewS}</span>
      <Outlet />
    </main>
  )
}

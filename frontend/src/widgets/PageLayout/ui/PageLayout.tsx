import { useTelegram } from 'entities/telegram'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { PageLoader } from 'widgets/PageLoader'

export const PageLayout = () => {
  const [view, setView] = useState<number>()
  const [viewS, setViewS] = useState<number>()

  const { viewport, viewportStable, onEvent } = useTelegram()

  useEffect(() => {
    setView(viewport)
  }, [viewport])

  useEffect(() => {
    setViewS(viewportStable)
  }, [viewportStable])

  return (
    <main>
      <span>vh: {view}</span>
      <br />
      <span>vsh: {viewS}</span>
      <Outlet />
    </main>
  )
}

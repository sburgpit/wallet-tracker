import { Outlet } from 'react-router-dom'
import { PageLoader } from 'widgets/PageLoader'

export const PageLayout = () => {
  return (
    <main>
      <span>vh: {getComputedStyle(document.querySelector('html')!).getPropertyValue('--tg-viewport-height')}</span>
      <br />
      <span>
        vsh: {getComputedStyle(document.querySelector('html')!).getPropertyValue('--tg-viewport-stable-height')}
      </span>
      <Outlet />
    </main>
  )
}

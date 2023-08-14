import Routing from 'pages'
import { withProviders } from './providers'
import './styles/index.scss'
import { useEffect } from 'react'
import { useTelegram } from 'entities/telegram'

const App = () => {
  const { telegram } = useTelegram()

  useEffect(() => {
    telegram.ready()
  }, [])

  return <Routing />
}

export default withProviders(App)

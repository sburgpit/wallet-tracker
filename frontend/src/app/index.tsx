import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks'
import { initSessionThunk } from 'features/auth/init'
import { RouterProvider } from './providers/RouterProvider'
import './styles/index.scss'
import { useTelegram } from 'entities/telegram'
import { selectUserData } from 'entities/user'

const App = () => {
  const userData = useAppSelector(selectUserData)
  const dispatch = useAppDispatch()
  const { readyApp } = useTelegram()

  useEffect(() => {
    readyApp()
  }, [])

  useEffect(() => {
    if (!userData) dispatch(initSessionThunk())
  }, [userData, dispatch])

  return <RouterProvider />
}

export default App

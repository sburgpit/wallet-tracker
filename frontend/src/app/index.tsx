import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks'
import { initSessionThunk } from 'features/auth/init'
import { RouterProvider } from './providers/RouterProvider'
import './styles/index.scss'
import { useTelegram } from 'entities/telegram'
import { selectUserData } from 'entities/user'
import { selectIsAuth } from 'entities/session'

const App = () => {
  const userData = useAppSelector(selectUserData)
  const isAuth = useAppSelector(selectIsAuth)
  const dispatch = useAppDispatch()
  const { readyApp } = useTelegram()

  useEffect(() => {
    readyApp()
  }, [])

  useEffect(() => {
    console.log(userData, isAuth)
    if (!userData || !isAuth) dispatch(initSessionThunk())
  }, [userData, isAuth, dispatch])

  return <RouterProvider />
}

export default App

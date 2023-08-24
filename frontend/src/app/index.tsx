import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks'
import { initSessionThunk } from 'features/auth/init'
import { RouterProvider } from './providers/RouterProvider'
import { selectIsInited } from 'entities/session'
import './styles/index.scss'

const App = () => {
  const isSessionInited = useAppSelector(selectIsInited)
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   telegram.ready()
  // }, [])

  useEffect(() => {
    if (!isSessionInited) dispatch(initSessionThunk())
  }, [isSessionInited, dispatch])

  return <RouterProvider />
}

export default App

import { useAppDispatch } from 'shared/lib/hooks/reduxHooks'
import { logoutThunk } from '../model/logout'

export const LogoutButton = () => {
  const dispatch = useAppDispatch()

  const onConfirmLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault()

    dispatch(logoutThunk())
  }

  return (
    <a href='#' onClick={onConfirmLogout}>
      logout
    </a>
  )
}

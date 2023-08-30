import { useAppDispatch } from 'shared/lib/hooks/reduxHooks'
import { logoutThunk } from '../model/logout'
import { Button } from 'shared/ui/Button'
import { BiLogOut } from 'react-icons/bi'

export const LogoutButton = () => {
  const dispatch = useAppDispatch()

  const onConfirmLogout = () => {
    dispatch(logoutThunk())
  }

  return (
    <Button onClick={onConfirmLogout} size='small' color='second' icon={<BiLogOut />} iconPosition='left'>
      Log Out
    </Button>
  )
}

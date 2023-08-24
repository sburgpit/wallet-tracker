import { selectIsAuth } from 'entities/session'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from 'shared/lib/hooks'

type GuestGuardProps = {
  children: React.ReactNode
}

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const isAuthorized = useAppSelector(selectIsAuth)
  if (!isAuthorized) return <Navigate to='/login' />
  return children
}

import { selectIsAuth } from 'entities/session'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from 'shared/lib/hooks'

type AuthGuardProps = {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const isAuthorized = useAppSelector(selectIsAuth)
  if (isAuthorized) return <Navigate to='/' />
  return children
}

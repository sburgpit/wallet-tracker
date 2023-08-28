import { selectIsAuth } from 'entities/session'
import { useAppSelector } from 'shared/lib/hooks'
import { LogoutButton } from 'features/auth/logout'
import { CloseButton } from 'features/telegram/close'
import css from './Navigation.module.scss'
import { getRouteAccounts, getRouteDashboard, getRouteOperations, getRouteSettings } from 'shared/config/routes'
import { Link } from 'react-router-dom'
import { Button } from 'shared/ui/Button'

export const Navigation = () => {
  const isAuthorized = useAppSelector(selectIsAuth)

  if (!isAuthorized) return null

  const links = [
    { path: getRouteDashboard(), label: 'Dashboard' },
    { path: getRouteAccounts(), label: 'Accounts' },
    { path: getRouteOperations(), label: 'Operations' },
    { path: getRouteSettings(), label: 'Settings' },
  ]

  return (
    <div className={css.Navigation}>
      <nav className='flex gap-s'>
        {links.map(({ path, label }) => (
          <Button to={path} color='second' size='small'>
            {label}
          </Button>
        ))}
      </nav>
      <div className='flex align-center gap-s'>
        <LogoutButton />
        <CloseButton />
      </div>
    </div>
  )
}

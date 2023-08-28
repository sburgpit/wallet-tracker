import { selectIsAuth } from 'entities/session'
import { useAppSelector } from 'shared/lib/hooks'
import { LogoutButton } from 'features/auth/logout'
import { CloseButton } from 'features/telegram/close'
import css from './Navigation.module.scss'
import { getRouteAccounts, getRouteDashboard, getRouteOperations, getRouteSettings } from 'shared/config/routes'
import { Button } from 'shared/ui/Button'
import { AiFillHome } from 'react-icons/ai'
import { MdAccountBalanceWallet } from 'react-icons/md'
import { BiTransferAlt } from 'react-icons/bi'
import { IoMdSettings } from 'react-icons/io'

export const Navigation = () => {
  const isAuthorized = useAppSelector(selectIsAuth)

  if (!isAuthorized) return null

  const links = [
    { path: getRouteDashboard(), icon: <AiFillHome /> },
    { path: getRouteAccounts(), icon: <MdAccountBalanceWallet /> },
    { path: getRouteOperations(), icon: <BiTransferAlt /> },
    { path: getRouteSettings(), icon: <IoMdSettings /> },
  ]

  return (
    <div className={css.Navigation}>
      <nav className='flex gap-s'>
        {links.map(({ path, icon }) => (
          <Button to={path} color='second' size='medium'>
            {icon}
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

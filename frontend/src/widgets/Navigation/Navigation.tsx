import { selectIsAuth } from 'entities/session'
import { useAppSelector } from 'shared/lib/hooks'
import { LogoutButton } from 'features/auth/logout'
import { CloseButton } from 'features/telegram/close'
import css from './Navigation.module.scss'
import {
  getRouteAccounts,
  getRouteDashboard,
  getRouteMain,
  getRouteOperations,
  getRouteSettings,
} from 'shared/config/routes'
import { Button } from 'shared/ui/Button'
import { AiFillHome } from 'react-icons/ai'
import { MdAccountBalanceWallet } from 'react-icons/md'
import { BiTransferAlt } from 'react-icons/bi'
import { IoMdSettings } from 'react-icons/io'
import { memo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const Navigation = memo(() => {
  const { pathname } = useLocation()
  const isAuthorized = useAppSelector(selectIsAuth)

  const links = [
    { path: getRouteMain(), icon: <AiFillHome /> },
    { path: getRouteAccounts(), icon: <MdAccountBalanceWallet /> },
    { path: getRouteOperations(), icon: <BiTransferAlt /> },
    { path: getRouteSettings(), icon: <IoMdSettings /> },
  ]

  if (!isAuthorized) return null

  return (
    <div className={css.Navigation}>
      <nav className='flex gap-s'>
        {links.map(({ path, icon }) => {
          return (
            <Button to={path} color='second' size='medium' isActive={path.split('/')[1] === pathname.split('/')[1]}>
              {icon}
            </Button>
          )
        })}
      </nav>
      <div className='flex align-center gap-s'>
        <LogoutButton />
        <CloseButton />
      </div>
    </div>
  )
})

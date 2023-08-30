import { memo } from 'react'
import { selectIsAuth } from 'entities/session'
import { useAppSelector } from 'shared/lib/hooks'
import { LogoutButton } from 'features/auth/logout'
import { CloseButton } from 'features/telegram/close'
import { getRouteAccountList, getRouteMain, getRouteOperations, getRouteSettings } from 'shared/config/routes'
import { Button } from 'shared/ui/Button'
import { AiFillHome } from 'react-icons/ai'
import { MdAccountBalanceWallet } from 'react-icons/md'
import { BiTransferAlt } from 'react-icons/bi'
import { IoMdSettings } from 'react-icons/io'
import { SlOptionsVertical } from 'react-icons/sl'
import { useLocation } from 'react-router-dom'
import { Dropdown } from 'shared/ui/Dropdown'
import css from './Navigation.module.scss'

export const Navigation = memo(() => {
  const { pathname } = useLocation()
  const isAuthorized = useAppSelector(selectIsAuth)

  const links = [
    { path: getRouteMain(), icon: <AiFillHome /> },
    { path: getRouteAccountList(), icon: <MdAccountBalanceWallet /> },
    { path: getRouteOperations(), icon: <BiTransferAlt /> },
    { path: getRouteSettings(), icon: <IoMdSettings /> },
  ]

  if (!isAuthorized) return null

  return (
    <header className={css.Navigation}>
      <nav className='flex gap-xs'>
        {links.map(({ path, icon }) => {
          const isActive = path.split('/')[1] === pathname.split('/')[1]
          return (
            <Button to={path} color='second' size='medium' isActive={isActive} key={path}>
              {icon}
            </Button>
          )
        })}
      </nav>
      <Dropdown
        trigger={(isOpen) => (
          <Button color={isOpen ? 'primary' : 'second'} size='medium'>
            <SlOptionsVertical />
          </Button>
        )}>
        <div className='flex flex-column gap-xs'>
          <LogoutButton />
          <CloseButton />
        </div>
      </Dropdown>
    </header>
  )
})

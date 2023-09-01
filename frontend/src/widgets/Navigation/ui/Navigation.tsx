import { memo } from 'react'
import { selectIsAuth } from 'entities/session'
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks'
import { logoutThunk } from 'features/auth/logout'
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
import { useTelegram } from 'entities/telegram'

export const Navigation = memo(() => {
  const { showConfirm, closeApp } = useTelegram()
  const { pathname } = useLocation()
  const isAuthorized = useAppSelector(selectIsAuth)
  const dispatch = useAppDispatch()

  const links = [
    { path: getRouteMain(), icon: <AiFillHome /> },
    { path: getRouteAccountList(), icon: <MdAccountBalanceWallet /> },
    { path: getRouteOperations(), icon: <BiTransferAlt /> },
    { path: getRouteSettings(), icon: <IoMdSettings /> },
  ]

  const logoutHandler = async () => {
    const isConfirmed = await showConfirm('Are you sure you want to log out?')
    if (!isConfirmed) return
    dispatch(logoutThunk)
  }

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
        options={[
          { label: 'Log Out', onClick: logoutHandler },
          { label: 'Close App', onClick: closeApp },
        ]}>
        {(isOpen) => (
          <Button color={isOpen ? 'primary' : 'second'} size='medium'>
            <SlOptionsVertical />
          </Button>
        )}
      </Dropdown>
    </header>
  )
})

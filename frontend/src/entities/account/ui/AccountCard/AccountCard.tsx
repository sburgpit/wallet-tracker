import { getRouteAccountDetails } from 'shared/config/routes'
import { AccountDetails } from '../../model/types'
import { Link } from 'react-router-dom'
import { MdOutlineAccountBalanceWallet, MdOutlineAccountBalance, MdEdit } from 'react-icons/md'
import { BsCreditCardFill, BsTrash } from 'react-icons/bs'
import { RiBitCoinLine } from 'react-icons/ri'
import { FiTrash2 } from 'react-icons/fi'
import { Text } from 'shared/ui/Text'
import { Currency } from 'types/payload-types'
import css from './AccountCard.module.scss'
import { useAppDispatch, useLongPress, useOnClickOutside } from 'shared/lib/hooks'
import { useCallback, useRef, useState } from 'react'
import { Button } from 'shared/ui/Button'
import { cn } from 'shared/lib/utils/classNames'
import { useTelegram } from 'entities/telegram'

type AccountCardProps = {
  account: AccountDetails
}

const accountIcons: Record<AccountDetails['type'], React.ReactNode> = {
  Cash: <MdOutlineAccountBalance />,
  Account: <MdOutlineAccountBalanceWallet />,
  Card: <BsCreditCardFill />,
  Crypto: <RiBitCoinLine />,
}

export const AccountCard = (props: AccountCardProps) => {
  const dispatch = useAppDispatch()
  const { showConfirm } = useTelegram()
  const { account } = props
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const { actions, isPressing, pressProgress, shouldPreventDefault } = useLongPress({
    delay: 600,
    onLongPress: () => setShowSettings(true),
  })
  const cardRef = useRef<HTMLAnchorElement | null>(null)

  useOnClickOutside(cardRef, () => setShowSettings(false))

  const linkPressHandler = useCallback(
    (event: React.MouseEvent) => {
      if (shouldPreventDefault) event.preventDefault()
    },
    [shouldPreventDefault]
  )

  const removeAccountHandler = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const result = await showConfirm(`Are you sure you want to DELETE the ${account.name} account?`)
    console.log(result)
  }

  return (
    <Link
      to={getRouteAccountDetails(account.id)}
      className={css.AccountCard}
      {...actions}
      onClick={linkPressHandler}
      ref={cardRef}>
      <div className={css.AccountCard__Info}>
        <div className='flex align-center gap-m'>
          {accountIcons[account.type]}
          <Text>{account.name}</Text>
        </div>
        <div className='flex align-center gap-s'>
          <Text>{account.balance.toFixed(2)}</Text>
          <Text color='hint'>{(account.currency as Currency).sign}</Text>
        </div>
      </div>
      {showSettings && (
        <div className={css.AccountCard__Settings}>
          <Button size='small' color='primary' onClick={removeAccountHandler}>
            <MdEdit />
          </Button>
          <Button size='small' color='dangerous'>
            <FiTrash2 />
          </Button>
        </div>
      )}
      {
        <div
          className={cn(css.AccountCard__Pressing, {
            [css.AccountCard__Pressing_show]: isPressing && pressProgress < 100,
          })}>
          <div style={{ width: `${pressProgress}%` }} />
        </div>
      }
    </Link>
  )
}

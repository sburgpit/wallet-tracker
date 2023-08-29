import { getRouteAccount } from 'shared/config/routes'
import { Account } from '../../model/types'
import { Link } from 'react-router-dom'
import { MdOutlineAccountBalanceWallet, MdOutlineAccountBalance } from 'react-icons/md'
import { BsCreditCardFill } from 'react-icons/bs'
import { RiBitCoinLine } from 'react-icons/ri'
import { Text } from 'shared/ui/Text'
import { Currency } from 'types/payload-types'
import css from './AccountCard.module.scss'
import { useLongPress } from 'shared/lib/hooks'
import { useCallback, useEffect } from 'react'

type AccountCardProps = {
  account: Account
}

const accountIcons: Record<Account['type'], React.ReactNode> = {
  Cash: <MdOutlineAccountBalance />,
  Account: <MdOutlineAccountBalanceWallet />,
  Card: <BsCreditCardFill />,
  Crypto: <RiBitCoinLine />,
}

export const AccountCard = (props: AccountCardProps) => {
  const { account } = props
  const { actions, isPressing, pressProgress, shouldPreventDefault } = useLongPress({
    delay: 800,
    onLongPress: () => console.log('longpress'),
  })

  const clickHandler = useCallback(
    (event: React.MouseEvent) => {
      if (shouldPreventDefault) event.preventDefault()
    },
    [shouldPreventDefault]
  )

  return (
    <Link to={getRouteAccount(account.id)} className={css.AccountCard} {...actions} onClick={clickHandler}>
      {isPressing && (
        <div className={css.AccountCard__Pressing}>
          <div style={{ width: `${pressProgress}%` }} />
        </div>
      )}

      <div className='flex align-center gap-m'>
        {accountIcons[account.type]}
        <Text>{account.name}</Text>
      </div>
      <div className='flex align-center gap-s'>
        <Text>{account.balance.toFixed(2)}</Text>
        <Text color='hint'>{(account.currency as Currency).sign}</Text>
      </div>
    </Link>
  )
}

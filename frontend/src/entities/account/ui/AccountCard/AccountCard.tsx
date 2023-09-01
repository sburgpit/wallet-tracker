import { getRouteAccountDetails } from 'shared/config/routes'
import { AccountDetails } from '../../model/types'
import { Link } from 'react-router-dom'
import { MdOutlineAccountBalanceWallet, MdOutlineAccountBalance, MdEdit } from 'react-icons/md'
import { BsCreditCardFill } from 'react-icons/bs'
import { RiBitCoinLine } from 'react-icons/ri'
import { FiTrash2 } from 'react-icons/fi'
import { Text } from 'shared/ui/Text'
import { Currency } from 'types/payload-types'
import { useState } from 'react'
import { cn } from 'shared/lib/utils/classNames'
import { useSwipeable } from 'react-swipeable'
import css from './AccountCard.module.scss'

type AccountCardProps = {
  account: AccountDetails
  onRemove: (accountID: string, accountName: string) => void
}

const accountIcons: Record<AccountDetails['type'], React.ReactNode> = {
  Cash: <MdOutlineAccountBalance />,
  Account: <MdOutlineAccountBalanceWallet />,
  Card: <BsCreditCardFill />,
  Crypto: <RiBitCoinLine />,
}

export const AccountCard = (props: AccountCardProps) => {
  const { account, onRemove } = props
  const [showSettings, setShowSettings] = useState<boolean>(false)

  const { ref: cardRef, onMouseDown } = useSwipeable({
    onSwipedLeft: () => setShowSettings(true),
    onSwipedRight: () => setShowSettings(false),
  })

  return (
    <Link
      to={getRouteAccountDetails(account.id)}
      className={cn(css.AccountCard, { [css.AccountCard_settingsIsShown]: showSettings })}
      ref={cardRef}
      onMouseDown={onMouseDown}>
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
      <div
        className={cn(css.AccountCard__Settings, { [css.AccountCard__Settings_shown]: showSettings })}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}>
        <button type='button' className={css.AccountCard__Settings__Button}>
          <MdEdit />
        </button>
        <button
          type='button'
          className={css.AccountCard__Settings__Button}
          onClick={() => onRemove(account.id, account.name)}>
          <FiTrash2 />
        </button>
      </div>
    </Link>
  )
}

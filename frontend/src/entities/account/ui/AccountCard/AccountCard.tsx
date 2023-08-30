import { getRouteAccountDetails } from 'shared/config/routes'
import { AccountDetails } from '../../model/types'
import { Link } from 'react-router-dom'
import { MdOutlineAccountBalanceWallet, MdOutlineAccountBalance, MdEdit } from 'react-icons/md'
import { BsCreditCardFill } from 'react-icons/bs'
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
import { removeAccount } from 'features/account/remove' // @todo forbidden use fetures in entities
import { useSwipeable } from 'react-swipeable'

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
  const { showConfirm, showAlert } = useTelegram()
  const { account } = props
  const [showSettings, setShowSettings] = useState<boolean>(false)

  const { ref: cardRef, onMouseDown } = useSwipeable({
    onSwipedLeft: (event) => {
      setShowSettings(true)
    },
    onSwipedRight: (event) => {
      setShowSettings(false)
    },
  })

  const removeAccountHandler = async () => {
    const result = await showConfirm(`Are you sure you want to DELETE the ${account.name} account?`)
    if (!result) return

    try {
      const result = await dispatch(removeAccount(account.id))
      showAlert(`${account.name} account has been successfully deleted`)
      console.log(result)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

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
        <button type='button' className={css.AccountCard__Settings__Button} onClick={removeAccountHandler}>
          <FiTrash2 />
        </button>
      </div>
    </Link>
  )
}

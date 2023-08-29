import { Text } from 'shared/ui/Text'
import { Accounts } from '../../model/types'
import { Button } from 'shared/ui/Button'
import { Shimmer } from 'shared/ui/Shimmer'
import { AccountCard } from '../AccountCard/AccountCard'

type AccountListProps = {
  accounts?: Accounts
  isLoading: boolean
}

export const AccountList = (props: AccountListProps) => {
  const { accounts, isLoading } = props

  if (isLoading) {
    return (
      <div className='flex flex-column gap-m'>
        {new Array(10).fill(0).map((_, i) => (
          <Shimmer height={50} width={'100%'} key={i} />
        ))}
      </div>
    )
  }

  if (!accounts || !accounts.docs.length) {
    return (
      <div className='flex flex-column gap-m align-center'>
        <Text>You don't have any accounts</Text>
        <Button size='small'>Create account</Button>
      </div>
    )
  }

  return (
    <div className='flex flex-column gap-m align-center'>
      {accounts.docs.map((account) => (
        <AccountCard account={account} key={account.id} />
      ))}
    </div>
  )
}

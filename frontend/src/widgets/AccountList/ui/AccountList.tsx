import { Text } from 'shared/ui/Text'
import type { AccountList as AccountListType } from 'entities/account'
import { Button } from 'shared/ui/Button'
import { Shimmer } from 'shared/ui/Shimmer'
import { AccountCard } from 'entities/account'
import { getRouteCreateAccount } from 'shared/config/routes'
import { useTelegram } from 'entities/telegram'
import { useAppDispatch } from 'shared/lib/hooks'
import { removeAccountThunk } from 'features/account/remove'

type AccountListProps = {
  accounts?: AccountListType
  isLoading: boolean
}

export const AccountList = (props: AccountListProps) => {
  const { accounts, isLoading } = props
  const { showConfirm, showAlert } = useTelegram()
  const dispatch = useAppDispatch()

  const onAccountRemove = async (ID: string, name: string) => {
    const result = await showConfirm(`Are you sure you want to DELETE the ${name} account?`)
    if (!result) return

    try {
      const result = await dispatch(removeAccountThunk(ID))
      showAlert(`${name} account has been successfully deleted`)
      console.log(result)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  if (isLoading) {
    return (
      <div className='flex flex-column gap-s'>
        {new Array(10).fill(0).map((_, i) => (
          <Shimmer height={46} width={'100%'} key={i} />
        ))}
      </div>
    )
  }

  if (!accounts || !accounts.docs.length) {
    return (
      <div className='flex flex-column gap-s align-center'>
        <Text>You don't have any accounts</Text>
        <Button size='small'>Create account</Button>
      </div>
    )
  }

  return (
    <div className='flex flex-column gap-s align-center'>
      {accounts.docs.map((account) => (
        <AccountCard account={account} onRemove={onAccountRemove} key={account.id} />
      ))}
      {import.meta.env.DEV && <Button to={getRouteCreateAccount()}>Create account</Button>}
    </div>
  )
}

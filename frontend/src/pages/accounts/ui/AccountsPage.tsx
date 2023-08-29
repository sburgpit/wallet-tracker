import { Page } from 'widgets/Page'
import { Text } from 'shared/ui/Text'
import { AccountList, useAccountsQuery } from 'entities/accounts'
import { useAppSelector } from 'shared/lib/hooks'
import { selectUserID } from 'entities/user/model/userSlice'

const AccountsPage = () => {
  const userID = useAppSelector(selectUserID)
  const { data, isFetching } = useAccountsQuery(userID || '')

  return (
    <Page>
      <div className='flex flex-column gap-l'>
        <Text font='second' color='hint' weight={500}>
          Accounts
        </Text>
        <AccountList accounts={data} isLoading={isFetching} />
      </div>
    </Page>
  )
}

export default AccountsPage

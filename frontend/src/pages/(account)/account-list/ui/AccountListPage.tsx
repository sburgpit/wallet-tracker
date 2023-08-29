import { Page } from 'widgets/Page'
import { AccountList, useAccountsQuery } from 'entities/accounts'
import { useAppSelector } from 'shared/lib/hooks'
import { selectUserID } from 'entities/user/model/userSlice'
import { Text } from 'shared/ui/Text'
import { useMainButton } from 'entities/telegram'
import { useNavigate } from 'react-router-dom'
import { getRouteCreateAccount } from 'shared/config/routes'

const AccountListPage = () => {
  const navigate = useNavigate()
  const userID = useAppSelector(selectUserID)
  const { data, isFetching } = useAccountsQuery(userID || '')

  useMainButton({ params: { text: 'Create account' }, onClick: () => navigate(getRouteCreateAccount()) })

  return (
    <Page
      header={
        <Text font='second' color='hint' weight={500}>
          Accounts
        </Text>
      }>
      <AccountList accounts={data} isLoading={isFetching} />
    </Page>
  )
}

export default AccountListPage

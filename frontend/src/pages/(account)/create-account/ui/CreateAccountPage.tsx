import { useTelegram } from 'entities/telegram'
import { AccountForm } from 'features/account/create'
import { useNavigate } from 'react-router-dom'
import { getRouteAccountList } from 'shared/config/routes'
import { PageTitle } from 'shared/ui/Text'
import { Page } from 'widgets/Page'

const CreateAccountPage = () => {
  const { showAlert } = useTelegram()
  const navigate = useNavigate()

  const onComplete = (name: string) => {
    navigate(getRouteAccountList())
    showAlert(`${name} account successfully created!`)
  }

  return (
    <Page header={<PageTitle>Account Creation</PageTitle>}>
      <AccountForm onComplete={onComplete} />
    </Page>
  )
}

export default CreateAccountPage

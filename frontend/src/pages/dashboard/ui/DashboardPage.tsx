import { Balance } from 'entities/accounts'
import { useMainButton } from 'entities/telegram'
import { useNavigate } from 'react-router-dom'
import { getRouteCreateOperation } from 'shared/config/routes'
import { PageTitle } from 'shared/ui/Text'
import { Page } from 'widgets/Page'

const DashboardPage = () => {
  const navigate = useNavigate()
  useMainButton({
    params: {
      text: 'Add Operation',
    },
    onClick: () => navigate(getRouteCreateOperation()),
  })

  return (
    <Page header={<PageTitle>Dashboard</PageTitle>}>
      <br />
      <Balance />
    </Page>
  )
}

export default DashboardPage

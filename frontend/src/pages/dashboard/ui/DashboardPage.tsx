import { Balance } from 'entities/account'
import { useMainButton } from 'entities/telegram'
import { useNavigate } from 'react-router-dom'
import { getRouteCreateOperation } from 'shared/config/routes'
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
    <Page>
      <Balance />
    </Page>
  )
}

export default DashboardPage

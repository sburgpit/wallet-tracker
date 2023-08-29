import { Balance } from 'entities/accounts'
import { Page } from 'widgets/Page'

const DashboardPage = () => {
  return (
    <Page>
      Dashboard Page
      <br />
      <Balance />
    </Page>
  )
}

export default DashboardPage

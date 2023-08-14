import { useGetOperationsQuery } from 'shared/api/operationAPI'

const OperationsListPage = () => {
  const { data } = useGetOperationsQuery('1')
  console.log(data)
  return <div>OperationsPage</div>
}

export default OperationsListPage

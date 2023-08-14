import { useTelegram } from 'entities/telegram'

const OperationsListPage = () => {
  // const { data } = useGetOperationsQuery('1')
  const { telegram } = useTelegram()
  telegram.MainButton.show()
  telegram.MainButton.setParams({
    text: `Add Operation`,
  })
  return (
    <div>
      <input type='text' />
      <div onClick={() => telegram.MainButton.hide()}>hide main</div>
    </div>
  )
}

export default OperationsListPage

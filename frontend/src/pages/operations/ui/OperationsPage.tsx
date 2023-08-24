import { useTelegram } from 'entities/telegram'

const OperationsPage = () => {
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

export default OperationsPage

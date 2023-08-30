import { useTelegram } from 'entities/telegram'
import { CgClose } from 'react-icons/cg'
import { Button } from 'shared/ui/Button'

export const CloseButton = () => {
  const { closeApp } = useTelegram()

  return (
    <Button icon={<CgClose />} onClick={closeApp} size='medium' color='second' iconPosition='left'>
      Close App
    </Button>
  )
}

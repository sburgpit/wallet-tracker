import { ButtonColors } from 'shared/ui/Button'

export type ModalData = {
  title: string
  subtitle?: string
  buttons?: ModalButton[]
  onClose?: () => void
  onOk?: () => void
  children?: React.ReactNode
}

export type ModalButton =
  | 'ok'
  | 'close'
  | {
      text: string
      color?: ButtonColors
      onClick?: () => void
    }

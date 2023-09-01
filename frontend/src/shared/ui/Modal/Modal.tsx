import { cn } from 'shared/lib/utils/classNames'
import { Button, ButtonProps } from '../Button'
import { Text } from '../Text'
import css from './Modal.module.scss'

type ModalProps = {
  title?: string
  subtitle?: string
  buttons?: ButtonProps[]
  children?: React.ReactNode
  isOpen: boolean
  closeModal?: () => void
}

export const Modal = (props: ModalProps) => {
  const { title, subtitle, children, buttons, isOpen, closeModal } = props

  return (
    <div className={css.ModalOverlap} onClick={closeModal}>
      <div className={cn(css.Modal, { [css.Modal_isOpen]: isOpen })} onClick={(e) => e.stopPropagation()}>
        <div className='flex flex-column gap-xxs align-center'>
          <Text font='second' weight={700} tag='h4'>
            {title}
          </Text>
          <Text color='hint' size='small' tag='p'>
            {subtitle}
          </Text>
        </div>
        <div className={css.Modal__Content}>{children}</div>
        <div className={'flex gap-xs flex-wrap'}>
          {buttons?.map(({ children, ...button }) => (
            <Button {...button}>{children}</Button>
          ))}
        </div>
      </div>
    </div>
  )
}

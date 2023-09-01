import { setDataAndShowModal } from 'entities/modal'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks'
import { ButtonProps } from 'shared/ui/Button'
import { Modal as ModalComponent } from 'shared/ui/Modal'

export const Modal = () => {
  const { data, isShown } = useAppSelector(({ modal }) => modal)
  const dispatch = useAppDispatch()

  const onButtonClick = (cb?: () => void) => () => {
    cb?.()
  }

  const onModalClose = () => {
    data?.onClose?.()
    dispatch(setDataAndShowModal({ isShown: false, data: null }))
  }

  useEffect(() => {
    console.log(data, isShown)
  }, [data, isShown])

  if (!data) return null

  return (
    <ModalComponent
      isOpen={isShown}
      title={data.title}
      subtitle={data.subtitle}
      closeModal={onModalClose}
      buttons={data.buttons?.map((button): ButtonProps => {
        if (button === 'ok')
          return {
            children: 'OK',
            color: 'primary',
            size: 'small',
            onClick: onButtonClick(data.onOk),
          }
        if (button === 'close')
          return {
            children: 'Close',
            color: 'dangerous',
            size: 'small',
            onClick: onButtonClick(),
          }

        const { text, color, onClick } = button
        return {
          children: text,
          color,
          size: 'small',
          onClick: onButtonClick(onClick),
        }
      })}>
      {data.children}
    </ModalComponent>
  )
}

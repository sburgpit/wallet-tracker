import { useEffect } from 'react'
import { useTelegram } from '..'

type useMainButtonArgs = {
  isShown?: boolean
  isDisabled?: boolean
  params?: {
    text?: string
    color?: string
    textColor?: string
  }
  onClick?: () => void
}

export const useMainButton = (args: useMainButtonArgs) => {
  const {
    telegram: { MainButton },
  } = useTelegram()
  const { isShown = true, isDisabled = false, params, onClick } = args

  useEffect(() => {
    if (onClick) MainButton.onClick(onClick)

    return () => {
      MainButton.hide()
      if (onClick) MainButton.offClick(onClick)
    }
  }, [])

  useEffect(() => {
    if (params)
      MainButton.setParams({
        color: params.color,
        text: params.text,
        text_color: params.textColor,
      })
  }, [params])

  useEffect(() => {
    if (isShown) MainButton.show()
    else MainButton.hide()
  }, [isShown, MainButton])

  useEffect(() => {
    if (isDisabled) {
      MainButton.disable()
      MainButton.setParams({ color: 'var(--hint-color)' })
    } else {
      MainButton.enable()
      MainButton.setParams({color: 'var(--button-color)'})
    }
  }, [isDisabled, MainButton])

  return MainButton
}

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
    if (isShown) MainButton.show()
    if (isDisabled) MainButton.disable()
    if (params)
      MainButton.setParams({
        color: params.color,
        text: params.text,
        text_color: params.textColor,
      })
    if (onClick) MainButton.onClick(onClick)

    return () => {
      MainButton.hide()
      if (onClick) MainButton.offClick(onClick)
    }
  }, [])

  return MainButton
}

import { useEffect } from 'react'
import { useTelegram } from './useTelegram'

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
      MainButton.setParams({ color: '#708499' })
    } else {
      MainButton.enable()
      MainButton.setParams({ color: '#5288c1' })
    }
  }, [isDisabled, MainButton])

  return MainButton
}

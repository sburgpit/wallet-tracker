import { useState, useEffect, useRef, useCallback } from 'react'

type UseLongPressOptions = {
  delay?: number
  onLongPress?: () => void
}

const SAFE_PRESS_TIME = 200

export const useLongPress = ({ delay, onLongPress }: UseLongPressOptions) => {
  const [shouldPreventDefault, setShouldPreventDefault] = useState(false)
  const [isPressing, setIsPressing] = useState(false)
  const [pressProgress, setPressProgress] = useState(0)
  const pressTimer = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const pressSafetyTimer = useRef<number | null>(null)

  const updatePressProgress = useCallback(() => {
    if (startTimeRef.current !== null) {
      const elapsedTime = Date.now() - startTimeRef.current
      const progress = (elapsedTime / (delay || 1000)) * 100
      setPressProgress(Math.min(progress, 100))
    }
  }, [startTimeRef, delay])

  const startPress = useCallback(() => {
    pressSafetyTimer.current = setTimeout(() => {
      setIsPressing(true)
      startTimeRef.current = Date.now()
      pressTimer.current = setInterval(updatePressProgress, 30)

      const onLongPressTimer = setTimeout(() => {
        onLongPress?.()
      }, delay || 1000)

      pressSafetyTimer.current = onLongPressTimer
    }, SAFE_PRESS_TIME)
  }, [delay, onLongPress, updatePressProgress])

  const stopPress = useCallback(() => {
    if (pressSafetyTimer.current !== null) {
      clearTimeout(pressSafetyTimer.current)
      pressSafetyTimer.current = null
    }
    setShouldPreventDefault(isPressing)
    setIsPressing(false)
    if (pressTimer.current !== null) {
      clearInterval(pressTimer.current)
      pressTimer.current = null
    }
    setPressProgress(0)
    startTimeRef.current = null
    setTimeout(() => {
      setShouldPreventDefault(false)
    }, 100)
  }, [isPressing])

  useEffect(() => {
    return () => {
      if (pressTimer.current !== null) {
        clearInterval(pressTimer.current)
        pressTimer.current = null
      }
      if (pressSafetyTimer.current !== null) {
        clearTimeout(pressSafetyTimer.current)
        pressSafetyTimer.current = null
      }
    }
  }, [])

  return {
    actions: {
      onMouseDown: startPress,
      onMouseUp: stopPress,
      onMouseLeave: stopPress,
      onTouchStart: startPress,
      onTouchEnd: stopPress,
    },
    isPressing,
    pressProgress,
    shouldPreventDefault,
  }
}

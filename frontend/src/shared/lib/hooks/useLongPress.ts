import { useState, useEffect, useRef, useCallback } from 'react'

type UseLongPressOptions = {
  delay?: number
  onLongPress?: () => void
}

const SAFE_PRESS_TIME = 200

export const useLongPress = (options: UseLongPressOptions) => {
  const [shouldPreventDefault, setShouldPreventDefault] = useState(false)
  const [isPressing, setIsPressing] = useState(false)
  const [pressProgress, setPressProgress] = useState(0)
  const pressTimer = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const pressSafetyTimer = useRef<number | null>(null)

  const updatePressProgress = () => {
    if (startTimeRef.current !== null) {
      const elapsedTime = Date.now() - startTimeRef.current
      const progress = (elapsedTime / (options.delay || 1000)) * 100
      setPressProgress(Math.min(progress, 100))
    }
  }

  const startPress = useCallback(() => {
    pressSafetyTimer.current = setTimeout(() => {
      setIsPressing(true)
      startTimeRef.current = Date.now()
      pressTimer.current = setInterval(updatePressProgress, 30)

      setTimeout(() => {
        options.onLongPress?.()
      }, options.delay || 1000)
    }, SAFE_PRESS_TIME)
  }, [options])

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

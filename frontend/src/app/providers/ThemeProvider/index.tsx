import { useEffect } from 'react'
import { useFeatureToggle } from 'shared/lib/hooks/useFeatureToggle'
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/reduxHooks'
import { Theme } from 'shared/config/theme'
import { changeTheme, selectCurrentTheme } from 'entities/theme'

type ThemeProviderProps = {
  initialTheme?: Theme
  children: React.ReactNode
}

export const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
  const currentTheme = useAppSelector(selectCurrentTheme)
  const darkModeIsEnabled = useFeatureToggle('darkMode')
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!darkModeIsEnabled) return

    if (initialTheme && initialTheme !== currentTheme) {
      dispatch(changeTheme(initialTheme))
      return
    }

    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme, initialTheme, darkModeIsEnabled, dispatch])

  return <>{children}</>
}

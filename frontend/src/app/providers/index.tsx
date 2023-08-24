import { PersistGate } from 'redux-persist/integration/react'
import { ReduxProvider } from './ReduxProvider'
import { persistedStore } from 'app/store'
import { ThemeProvider } from './ThemeProvider'
import { ErrorBoundary } from './ErrorBoundary'

type ProvidersProps = {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ErrorBoundary>
      <ReduxProvider>
        <PersistGate loading={null} persistor={persistedStore}>
          <ThemeProvider>{children}</ThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </ErrorBoundary>
  )
}

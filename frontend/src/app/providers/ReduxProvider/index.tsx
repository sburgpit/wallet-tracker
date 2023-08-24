import { store } from 'app/store'
import { Provider } from 'react-redux'

export type ReduxProviderProps = {
  children?: React.ReactNode
}

export const ReduxProvider = ({ children }: ReduxProviderProps) => <Provider store={store}>{children}</Provider>

export enum Route {
  MAIN = 'main',
  SETTINGS = 'settings',
  DASHBOARD = 'dashboard',
  OPERATION = 'operation',
  OPERATIONS = 'operations',
  ACCOUNT = 'account',
  ACCOUNTS = 'accounts',
  LOGIN = 'login',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not-found',
}

export const getRouteMain = () => '/'
export const getRouteSettings = () => '/settings'
export const getRouteDashboard = () => '/dashboard'
export const getRouteOperations = () => '/operations'
export const getRouteOperation = (id: string) => `/operation/${id}`
export const getRouteAccounts = () => `/accounts`
export const getRouteAccount = (id: string) => `/account/${id}`
export const getRouteLogin = () => `/login`
export const getRouteForbidden = () => '/forbidden'

export const RouteByPathPattern: Record<string, Route> = {
  [getRouteMain()]: Route.MAIN,
  [getRouteSettings()]: Route.SETTINGS,
  [getRouteDashboard()]: Route.DASHBOARD,
  [getRouteOperation(':id')]: Route.OPERATION,
  [getRouteOperations()]: Route.OPERATIONS,
  [getRouteAccount(':id')]: Route.ACCOUNT,
  [getRouteAccounts()]: Route.ACCOUNTS,
  [getRouteLogin()]: Route.LOGIN,
  [getRouteForbidden()]: Route.FORBIDDEN,
}

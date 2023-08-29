export enum Route {
  MAIN = 'main',
  SETTINGS = 'settings',
  DASHBOARD = 'dashboard',
  OPERATION = 'operation',
  OPERATIONS = 'operations',

  ACCOUNT_LIST = 'account-list',
  ACCOUNT_DETAILS = 'account-details',
  CREATE_ACCOUNT = 'create-account',
  EDIT_ACCOUNT = 'edit-account',

  LOGIN = 'login',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not-found',
}

export const getRouteMain = () => '/'
export const getRouteSettings = () => '/settings'
export const getRouteDashboard = () => '/dashboard'
export const getRouteOperations = () => '/operations'
export const getRouteOperation = (id: string) => `/operation/${id}`

export const getRouteAccountList = () => `/account-list`
export const getRouteAccountDetails = (id: string) => `/account-details/${id}`
export const getRouteCreateAccount = () => `/account/create`
export const getRouteEditAccount = (id: string) => `/account/edit/${id}`

export const getRouteLogin = () => `/login`
export const getRouteForbidden = () => '/forbidden'

export const RouteByPathPattern: Record<string, Route> = {
  [getRouteMain()]: Route.MAIN,
  [getRouteSettings()]: Route.SETTINGS,
  [getRouteDashboard()]: Route.DASHBOARD,
  [getRouteOperation(':id')]: Route.OPERATION,
  [getRouteOperations()]: Route.OPERATIONS,

  [getRouteAccountList()]: Route.ACCOUNT_LIST,
  [getRouteAccountDetails(':id')]: Route.ACCOUNT_DETAILS,
  [getRouteCreateAccount()]: Route.CREATE_ACCOUNT,
  [getRouteEditAccount(':id')]: Route.EDIT_ACCOUNT,

  [getRouteLogin()]: Route.LOGIN,
  [getRouteForbidden()]: Route.FORBIDDEN,
}

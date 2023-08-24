import { AccountPage } from 'pages/account'
import { AccountsPage } from 'pages/accounts'
import { DashboardPage } from 'pages/dashboard'
import { ErrorPage } from 'pages/error'
import { LoginPage } from 'pages/login'
import { NotFoundPage } from 'pages/not-found'
import { OperationPage } from 'pages/operation'
import { OperationsPage } from 'pages/operations'
import { SettingsPage } from 'pages/settings'
import { RouteProps } from 'react-router-dom'
import {
  Route,
  getRouteAccount,
  getRouteAccounts,
  getRouteDashboard,
  getRouteForbidden,
  getRouteLogin,
  getRouteOperation,
  getRouteOperations,
  getRouteSettings,
} from 'shared/config/routes'

export const routerConfig: Record<Route, RouteProps & { authOnly?: boolean; guards?: string[] }> = {
  [Route.MAIN]: {
    index: true,
    element: <DashboardPage />,
    authOnly: true,
  },
  [Route.DASHBOARD]: {
    path: getRouteDashboard(),
    element: <DashboardPage />,
    authOnly: true,
  },
  [Route.ACCOUNT]: {
    path: getRouteAccount(':id'),
    element: <AccountPage />,
    authOnly: true,
  },
  [Route.ACCOUNTS]: {
    path: getRouteAccounts(),
    element: <AccountsPage />,
    authOnly: true,
  },
  [Route.OPERATION]: {
    path: getRouteOperation(':id'),
    element: <OperationPage />,
    authOnly: true,
  },
  [Route.OPERATIONS]: {
    path: getRouteOperations(),
    element: <OperationsPage />,
    authOnly: true,
  },
  [Route.SETTINGS]: {
    path: getRouteSettings(),
    element: <SettingsPage />,
    authOnly: true,
  },
  [Route.LOGIN]: {
    path: getRouteLogin(),
    element: <LoginPage />,
  },
  [Route.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ErrorPage />,
  },
  [Route.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
}

import { Guard } from 'features/guard'
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

export const routerConfig: Record<Route, RouteProps & { guards?: Guard[] }> = {
  [Route.MAIN]: {
    index: true,
    element: <DashboardPage />,
    guards: ['Guest'],
  },
  [Route.DASHBOARD]: {
    path: getRouteDashboard(),
    element: <DashboardPage />,
    guards: ['Guest'],
  },
  [Route.ACCOUNT]: {
    path: getRouteAccount(':id'),
    element: <AccountPage />,
    guards: ['Guest'],
  },
  [Route.ACCOUNTS]: {
    path: getRouteAccounts(),
    element: <AccountsPage />,
    guards: ['Guest'],
  },
  [Route.OPERATION]: {
    path: getRouteOperation(':id'),
    element: <OperationPage />,
    guards: ['Guest'],
  },
  [Route.OPERATIONS]: {
    path: getRouteOperations(),
    element: <OperationsPage />,
    guards: ['Guest'],
  },
  [Route.SETTINGS]: {
    path: getRouteSettings(),
    element: <SettingsPage />,
    guards: ['Guest'],
  },
  [Route.LOGIN]: {
    path: getRouteLogin(),
    element: <LoginPage />,
    guards: ['Auth'],
  },
  [Route.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ErrorPage />,
    guards: ['Guest'],
  },
  [Route.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
}

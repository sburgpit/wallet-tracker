import { Guard } from 'features/guard'

import { AccountDetailsPage } from 'pages/(account)/account-details'
import { AccountListPage } from 'pages/(account)/account-list'
import { CreateAccountPage } from 'pages/(account)/create-account'
import { EditAccountPage } from 'pages/(account)/edit-account'

import { CreateOperationPage } from 'pages/(operation)/create-operation'

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
  getRouteAccountDetails,
  getRouteAccountList,
  getRouteCreateAccount,
  getRouteCreateOperation,
  getRouteDashboard,
  getRouteEditAccount,
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

  [Route.ACCOUNT_LIST]: {
    path: getRouteAccountList(),
    element: <AccountListPage />,
    guards: ['Guest'],
  },
  [Route.ACCOUNT_DETAILS]: {
    path: getRouteAccountDetails(':id'),
    element: <AccountDetailsPage />,
    guards: ['Guest'],
  },
  [Route.CREATE_ACCOUNT]: {
    path: getRouteCreateAccount(),
    element: <CreateAccountPage />,
    guards: ['Guest'],
  },
  [Route.EDIT_ACCOUNT]: {
    path: getRouteEditAccount(':id'),
    element: <EditAccountPage />,
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
  [Route.CREATE_OPERATION]: {
    path: getRouteCreateOperation(),
    element: <CreateOperationPage />,
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

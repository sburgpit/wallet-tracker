import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from 'shared/ui/RootLayout'

const OperationsListPage = lazy(() => import('./operations-list'))
const OperationPage = lazy(() => import('./operation'))
const ErrorPage = lazy(() => import('./error'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <OperationsListPage /> },
          { path: 'operations', element: <OperationsListPage /> },
          { path: 'operation', element: <OperationPage /> },
        ],
      },
    ],
  },
])

const Routing = () => <RouterProvider router={router} />

export default Routing

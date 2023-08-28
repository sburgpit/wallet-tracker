import { ErrorPage } from 'pages/error'
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from 'react-router-dom'
import { getRouteMain } from 'shared/config/routes'
import { DefaultLayout } from 'app/layout'
import { routerConfig } from '../config/routerConfig'
import { Suspense } from 'react'
import { PageLoader } from 'widgets/PageLoader'
import { withGuard } from 'features/guard'

const router = createBrowserRouter([
  {
    path: getRouteMain(),
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: Object.values(routerConfig).map(({ index, path, element, guards }) => ({
          index,
          path,
          element: <Suspense fallback={<PageLoader />}>{withGuard(guards)(element)}</Suspense>,
        })),
      },
    ],
  },
])

export const RouterProvider = () => <ReactRouterProvider router={router} />

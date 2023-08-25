import { ErrorPage } from 'pages/error'
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from 'react-router-dom'
import { getRouteMain } from 'shared/config/routes'
import { PageLayout } from 'widgets/PageLayout'
import { routerConfig } from './config/routerConfig'
import { Suspense } from 'react'
import { PageLoader } from 'widgets/PageLoader'
import { withGuard } from 'features/guard'

const router = createBrowserRouter([
  {
    path: getRouteMain(),
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: Object.values(routerConfig).map(({ index, path, element, authOnly }) => ({
          index,
          path,
          element: <Suspense fallback={<PageLoader />}>{withGuard(authOnly ? ['Guest'] : null)(element)}</Suspense>,
        })),
      },
    ],
  },
])

export const RouterProvider = () => <ReactRouterProvider router={router} />

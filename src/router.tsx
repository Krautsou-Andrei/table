import { createBrowserRouter } from 'react-router-dom'

import { HomePage } from '@/pages/homepage'

import { ProtectedRoute } from '@/components/protected-route.tsx'
import Layout from '@/components/layout.tsx'

import { ROUTES } from '@/consts/routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
    ],
  },
])

export default router

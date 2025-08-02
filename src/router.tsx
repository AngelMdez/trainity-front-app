import PrivateRoute from '@/features/auth/ui/PrivateRoute'
import RegisterPage from '@/features/auth/ui/RegisterPage'
import LoginPage from '@/features/auth/ui/LoginPage'
import HomePage from '@/features/home/ui/HomePage'
import ChartsPage from '@/features/charts/ui/ChartsPage'
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/features/layout/ui/Layout'

export const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { path: '', element: <HomePage /> },
          { path: 'charts', element: <ChartsPage /> },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
])

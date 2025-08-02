import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/features/layout/ui/Layout'
import HomePage from '@/features/home/ui/HomePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
])

import React from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import PrivateRoute from '@/features/auth/ui/PrivateRoute'
import AdminRoute from '@/features/auth/ui/AdminRoute'

import LoginPage from '@/features/auth/ui/LoginPage'
import RegisterPage from '@/features/auth/ui/RegisterPage'
import HomePage from '@/features/home/ui/HomePage'
import Layout from '@/features/layout/ui/Layout'

import ClientsPage from '@/features/admin/ui/ClientsPage'
import ClientDetailPage from '@/features/admin/ui/ClientDetailPage'

import NutritionPlansPage from '@/features/nutritionPlans/ui/NutritionPlansPage'
import NutritionPlanDetailPage from '@/features/nutritionPlans/ui/NutritionPlanDetailPage'
import NutritionPlanCreatePage from '@/features/nutritionPlans/ui/NutritionPlanCreatePage'
import NutritionPlanEditPage from '@/features/nutritionPlans/ui/NutritionPlanEditPage'

import NotAuthorizedPage from '@/features/admin/ui/NotAuthorizedPage'
import LogoutPage from '@/features/auth/ui/LogoutPage'
import ForgotPasswordPage from '@/features/auth/ui/ForgotPasswordPage'

export const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { path: '', element: <HomePage /> },

          // Rutas admin protegidas
          {
            path: 'admin',
            element: (
              <AdminRoute requiredRole='admin' redirectPath='/not-authorized' fallback={<div>Loading...</div>}>
                <Outlet />
              </AdminRoute>
            ),
            children: [
              { path: 'clients', element: <ClientsPage /> },
              { path: 'clients/:id', element: <ClientDetailPage /> },

              // Planes de nutrición (admin)
              { path: 'nutrition-plans', element: <NutritionPlansPage /> },
              { path: 'nutrition-plans/new', element: <NutritionPlanCreatePage /> },
              { path: 'nutrition-plans/:id/edit', element: <NutritionPlanEditPage /> },
            ],
          },

          // Rutas públicas para usuarios autenticados
          { path: 'nutrition-plans', element: <NutritionPlansPage /> },
          { path: 'nutrition-plans/:id', element: <NutritionPlanDetailPage /> },
        ],
      },
    ],
  },

  { path: '/login', element: <LoginPage /> },
  { path: '/logout', element: <LogoutPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/not-authorized', element: <NotAuthorizedPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
])

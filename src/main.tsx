import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nProvider } from '@/features/i18n/context/I18nProvider'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './index.css'
import { AuthProvider } from '@/features/auth/context/auth-context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </I18nProvider>
  </React.StrictMode>,
)

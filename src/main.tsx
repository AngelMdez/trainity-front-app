import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nProvider } from '@/features/i18n/context/I18nProvider'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  </React.StrictMode>,
)

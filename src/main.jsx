import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import {
  RouterProvider,
} from "react-router";
import router from './router/routes.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </QueryClientProvider>
)

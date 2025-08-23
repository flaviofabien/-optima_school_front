import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from './router/router';
import './index.css'
import { store } from './store/store';
import { Provider } from 'react-redux'

const router = createBrowserRouter(Router);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router}  />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)

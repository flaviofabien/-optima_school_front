import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css'
import { store } from './store/store';
import { Provider } from 'react-redux'
import App from './App';
import { io } from 'socket.io-client';
import { IPLocal } from './api/IP';

export const socket = io(IPLocal, {
  autoConnect: true, // ← ou false si tu veux appeler socket.connect() manuellement
  transports: ["websocket"], // ← force le transport WebSocket pur
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import AppRoutes from './routes';
import './style.css'
import React from 'react';
import { AlertProvider } from './api/providers/alertContext';
import { Alert } from './pages/components/ui/alert';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <AlertProvider>
        <QueryClientProvider client={queryClient}>
          <Alert />
          <AppRoutes />
        </QueryClientProvider>
      </AlertProvider>
    </>
  );
}

export default App;

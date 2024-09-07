import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
// import { Test } from './pages/test/test-display';
import AppRoutes from './routes';


function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </>
  );
}

export default App;

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
// import { Test } from './pages/test/test-display';
import AppRoutes from './routes';
import Header from './pages/landing/components/header';
import Footer from './pages/landing/components/footer';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <AppRoutes />
      </QueryClientProvider><Footer />
    </>
  );
}

export default App;

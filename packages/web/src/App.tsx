import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { Test } from './pages/test/test-display';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Test />
    </QueryClientProvider>
  );
}

export default App;

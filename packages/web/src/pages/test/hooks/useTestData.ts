import { useQuery } from '@tanstack/react-query';
import { getApiClient } from '../../../api/client';

export const useTestData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['test-data'],
    queryFn: async () => {
      const res = await getApiClient().get('/main/test-data');
      console.log(res.data);
      return res.data;
    },
  });

  return { data, isLoading };
};

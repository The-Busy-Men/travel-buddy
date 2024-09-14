import { useQuery } from '@tanstack/react-query';
import { getApiClient } from '../../../../api/client';

export const useObjects = ({ objectType }: { objectType: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['objects'],
    queryFn: async () => {
      switch (objectType) {
        case 'hotel': {
          const res = await getApiClient().get('/hotel');
          return res.data;
        }
        case 'airbnb': {
          const res = await getApiClient().get('/airbnb');
          return res.data;
        }
        default:
          throw new Error('Object type does not exist');
      }
    },
  });

  return { data, isLoading };
};

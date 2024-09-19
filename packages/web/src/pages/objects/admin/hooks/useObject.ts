import { useQuery } from '@tanstack/react-query';
import { getApiClient } from '../../../../api/client';

export const useObject = ({
  objectId,
  objectType,
}: {
  objectId: string;
  objectType: string;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['object-get'],
    queryFn: async () => {
      switch (objectType) {
        case 'hotel': {
          const res = await getApiClient().get(`/hotel/${objectId}`);
          return res.data;
        }
        case 'airbnb': {
          const res = await getApiClient().get(`/airbnb/${objectId}`);
          return res.data;
        }
        default:
          throw new Error('Object Type not recognized');
      }
    },
  });

  return { data, isLoading };
};

import { getApiClient } from '../../../api/client';
import { useQuery } from '@tanstack/react-query';

export interface User {
  id: string;
  email: string;
  role: string;
}

export interface Group {
  id: string;
  name: string;
  members: User[];
}

export const useGroupsWithMembers = () => {
  const { data: groups, isLoading } = useQuery({
    queryKey: ['groups-multiple'],
    queryFn: async () => {
      const res = await getApiClient().get('/groups');
      return res.data;
    },
  });

  return { groups, isLoading };
};

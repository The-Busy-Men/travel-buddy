import { useQuery } from '@tanstack/react-query';
import { UUID } from 'crypto';
import { getApiClient } from '../../../api/client';

export const useApprovalById = (approvalId: UUID) => {
  const { data: approvalData, isLoading: approvalDataIsLoading } = useQuery({
    queryKey: ['approval', `${approvalId}`],
    queryFn: async () => {
      const res = await getApiClient().get(`/approvals/get/${approvalId}`);
      return res.data;
    },
  });

  return { approvalData, approvalDataIsLoading };
};

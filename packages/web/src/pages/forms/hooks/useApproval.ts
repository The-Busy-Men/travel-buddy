/* eslint-disable react-hooks/rules-of-hooks */
import { UUID } from 'crypto';
import { getApiClient } from '../../../api/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PriceClass } from '../../../api/entities';
import { getApprovalStatusFromQuery } from '../../approvals/utils/approvalFromQuery';

interface dataDict {
  name: string;
  description?: string;
  amenities?: string;
}

export interface hotelDataDict extends dataDict {
  stars: number;
  numRooms: number;
  priceClass: PriceClass;
}

export interface airbnbDataDict extends dataDict {
  hostName: string;
  bedrooms: number;
  bathrooms: number;
  isShared: boolean;
}

export enum ApprovalStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
  none = '',
}

export const useApproval = (statusQuery: string[] | null = ['']) => {
  const apprStatus = getApprovalStatusFromQuery(statusQuery);
  const { data: allApprovalData, isLoading: allApprovalLoading } = useQuery({
    queryKey: ['approvals', 'admin', apprStatus],
    queryFn: async () => {
      const query =
        apprStatus.length > 0
          ? `?${apprStatus.map((status) => `status=${status}`).join('&')}`
          : '';

      const res = await getApiClient().get(`/approvals${query}`);
      return res.data;
    },
  });

  const createApprovalRequest = useMutation({
    mutationFn: async ({
      body,
    }: {
      body: {
        type: string;
        data: hotelDataDict | airbnbDataDict;
        submittedBy: UUID;
      };
    }) => {
      const res = await getApiClient().post('/approvals', body);
      return res.data;
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { createApprovalRequest, allApprovalData, allApprovalLoading };
};

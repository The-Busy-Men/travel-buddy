/* eslint-disable react-hooks/rules-of-hooks */
import { UUID } from 'crypto';
import { getApiClient } from '../../../api/client';
import { useMutation } from '@tanstack/react-query';
import { PriceClass } from '../../../api/entities';

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

export const useApproval = () => {
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

  return { createApprovalRequest };
};

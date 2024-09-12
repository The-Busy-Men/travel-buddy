import { UUID } from 'crypto';

export enum AddressType {
  home,
  work,
  billing,
  shipping,
}

export enum PriceClass {
  budget,
  low,
  medium,
  high,
  luxury,
}

// Address interface
export interface Address {
  id: string;
  street_address: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  addressLine2?: string;
  addressType: AddressType[];
}

// Base ObjectEntity interface
interface ObjectEntity {
  id: UUID;
  name: string;
  description?: string;
  owners: string[];
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  rating?: number;
  amenities?: string;
  address?: Address;
}

// Hotel extends ObjectEntity
export interface Hotel extends ObjectEntity {
  numberRooms?: number;
  stars?: number;
  priceClass?: PriceClass;
}

// AirBnb extends ObjectEntity
export interface AirBnb extends ObjectEntity {
  hostName: string;
  bedrooms: number;
  bathrooms: number;
  isShared: boolean;
}

// Union type for Hotel or AirBnb
export type ObjectType = Hotel | AirBnb;

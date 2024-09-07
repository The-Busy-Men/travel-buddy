import { UUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AddressType } from './utils/address.type';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column('text')
  streetAddress: string;

  @Column('text')
  city: string;

  @Column('text', { nullable: true })
  state: string;

  @Column('text')
  postalCode: string;

  @Column('text')
  country: string;

  @Column('text', { nullable: true })
  addressLine2: string;

  @Column('enum', { enum: AddressType, enumName: 'addressType', array: true })
  addressType: AddressType[];
}

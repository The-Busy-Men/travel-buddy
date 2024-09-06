import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class ObjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { array: true })
  owners: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('boolean')
  active: boolean;

  @Column('float', { nullable: true })
  rating: number;

  @Column('text', { nullable: true })
  amenities: string;

  @ManyToOne(() => Address, (address) => address.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  address: Address;
}

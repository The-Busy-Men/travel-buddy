import { Column, Entity } from 'typeorm';
import { ObjectEntity } from './object.entity';

@Entity()
export class AirBnb extends ObjectEntity {
  @Column('text')
  hostName: string;

  @Column('int')
  bedrooms: number;

  @Column('int')
  bathrooms: number;

  @Column('boolean')
  isShared: boolean;
}

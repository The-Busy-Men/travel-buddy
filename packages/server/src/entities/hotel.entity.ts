import { Column, Entity } from 'typeorm';
import { ObjectEntity } from './object.entity';
import { PriceClass } from './utils/hotel.priceclass';

@Entity()
export class Hotel extends ObjectEntity {
  @Column('int', { nullable: true })
  numberRooms: number;

  @Column('int', { nullable: true })
  stars: number;

  @Column('enum', { enum: PriceClass, enumName: 'PriceClass', nullable: true })
  priceClass: PriceClass;
}

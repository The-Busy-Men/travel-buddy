import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Test {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('text')
  name: string;
}

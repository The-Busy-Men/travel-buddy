import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Address } from './address.entity';
import { Group } from './group.entity';
import { UserRoles } from './utils/role.types';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @ManyToOne(() => Address, (address) => address.id, {
    nullable: true,
    cascade: true,
  })
  address: Address;

  @Column('enum', {
    enum: UserRoles,
    enumName: 'User Roles',
    array: true,
    default: [UserRoles.user],
  })
  roles: UserRoles[];

  @ManyToMany(() => Group, (group) => group.users, { nullable: true })
  @JoinTable({
    name: 'user_groups',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'groupId', referencedColumnName: 'id' },
  })
  groups: Group[];

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}

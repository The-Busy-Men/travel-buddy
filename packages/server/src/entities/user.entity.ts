import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Address } from './address.entity';
import { UserRoles } from './utils/role.types';
import { UserGroupRole } from './usergrouprole.entity';

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

  @OneToMany(() => UserGroupRole, (userGroupRole) => userGroupRole.user)
  groupRoles: UserGroupRole[];

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserGroupRole } from './usergrouprole.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => UserGroupRole, (userGroupRole) => userGroupRole.group)
  members: UserGroupRole[];
}

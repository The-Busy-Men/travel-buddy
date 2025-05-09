import { UUID } from 'crypto';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Group } from './group.entity';
import { GroupRoles } from './utils/groupRoles.type';

@Entity()
export class UserGroupRole {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => User, (user) => user.groupRoles)
  user: User;

  @ManyToOne(() => Group, (group) => group.members)
  group: Group;

  @Column('enum', { enum: GroupRoles, enumName: 'groupRoles' })
  role: GroupRoles;
}

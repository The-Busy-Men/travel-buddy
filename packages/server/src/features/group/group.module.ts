import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/entities/group.entity';
import { GroupController } from 'src/api/controllers/group.controller';
import { GroupService } from './group.service';
import { UserService } from '../user/user.service';
import { UserGroupRoleService } from './usergrouprole.service';
import { UserGroupRole } from 'src/entities/usergrouprole.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, UserGroupRole, User])],
  controllers: [GroupController],
  providers: [GroupService, UserService, UserGroupRoleService],
  exports: [GroupService, UserGroupRoleService],
})
export class GroupModule {}

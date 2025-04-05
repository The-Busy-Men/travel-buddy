import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Group } from 'src/entities/group.entity';
import { User } from 'src/entities/user.entity';
import { UserGroupRole } from 'src/entities/usergrouprole.entity';
import { GroupRoles } from 'src/entities/utils/groupRoles.type';
import { Repository } from 'typeorm';

const isValidRole = (role: string): boolean => {
  if (!(<any>Object).values(GroupRoles).includes(role)) {
    return false;
  }
  return true;
};

@Injectable()
export class UserGroupRoleService {
  constructor(
    @InjectRepository(UserGroupRole)
    private readonly userGroupRoleRepository: Repository<UserGroupRole>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  // Method to assign a role to a user in a group
  async assignRoleToUser(
    userId: UUID,
    groupId: UUID,
    roleName: string,
  ): Promise<UserGroupRole> {
    // Step 1: Find the user, group, and role
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });
    if (!group) {
      throw new Error('Group not found');
    }

    if (!isValidRole(roleName)) {
      throw new Error('Role Name does not exist.');
    }
    const role = roleName as GroupRoles;

    // Step 2: Assign the user to the group with the role
    const userGroupRole = new UserGroupRole();
    userGroupRole.user = user;
    userGroupRole.group = group;
    userGroupRole.role = role;

    return this.userGroupRoleRepository.save(userGroupRole);
  }

  // Method to add a user to a group with a default "member" role
  async addUserToGroup(userId: UUID, groupId: UUID): Promise<UserGroupRole> {
    const userGroupRole = await this.userGroupRoleRepository.findOne({
      where: { user: { id: userId }, group: { id: groupId } },
    });

    if (userGroupRole) {
      throw new Error('User already in group');
    }
    return this.assignRoleToUser(userId, groupId, 'member');
  }

  // Method to change a user's role in a group
  async changeUserRole(
    userId: UUID,
    groupId: UUID,
    newRoleName: string,
  ): Promise<UserGroupRole> {
    const userGroupRole = await this.userGroupRoleRepository.findOne({
      where: { user: { id: userId }, group: { id: groupId } },
    });

    if (!userGroupRole) {
      throw new Error('User is not part of this group');
    }

    if (!isValidRole(newRoleName)) {
      throw new Error('Role Name does not exist.');
    }
    const newRole = newRoleName as GroupRoles;

    await this.userGroupRoleRepository.update(
      { id: userGroupRole.id },
      {
        role: newRole,
      },
    );

    return await this.userGroupRoleRepository.findOne({
      where: { id: userGroupRole.id },
    });
  }

  // Method to remove a user from a group
  async removeUserFromGroup(userId: UUID, groupId: UUID): Promise<void> {
    const userGroupRole = await this.userGroupRoleRepository.findOne({
      where: { user: { id: userId }, group: { id: groupId } },
    });
    if (userGroupRole) {
      await this.userGroupRoleRepository.delete(userGroupRole);
    } else {
      throw new Error('User is not part of this group');
    }
  }
}

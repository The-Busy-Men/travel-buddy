import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { Group } from 'src/entities/group.entity';
import { UserGroupRoleService } from './usergrouprole.service';
import { GroupRoles } from 'src/entities/utils/groupRoles.type';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    private readonly userGroupRoleService: UserGroupRoleService,
  ) {}

  // Create a group and assign the user as owner
  async createGroup(groupName: string, creatorUserId: UUID): Promise<Group> {
    // Step 1: Create the group
    const group = new Group();
    group.name = groupName;
    const savedGroup = await this.groupRepository.save(group);

    // Step 2: Assign the creator as the "owner" of the group
    await this.userGroupRoleService.assignRoleToUser(
      creatorUserId,
      savedGroup.id as UUID,
      GroupRoles.owner,
    );

    return savedGroup;
  }

  // Add another user to the group with a "member" role
  async addUserToGroup(groupId: UUID, userId: UUID): Promise<void> {
    await this.userGroupRoleService.addUserToGroup(userId, groupId);
  }

  // Change a user's role in the group
  async changeUserRoleInGroup(
    groupId: UUID,
    userId: UUID,
    roleName: string,
  ): Promise<void> {
    await this.userGroupRoleService.changeUserRole(userId, groupId, roleName);
  }

  async getGroupById(groupId: UUID) {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ['members', 'members.user'],
    });

    return {
      ...group,
      members: group.members.map((member) => ({
        id: member.user.id,
        email: member.user.email,
        role: member.role,
      })),
    };
  }

  async getAllGroups() {
    const groups = await this.groupRepository.find({
      relations: ['members', 'members.user'],
    });

    return groups.map((group) => ({
      ...group,
      members: group.members.map((member) => ({
        id: member.user.id,
        email: member.user.email,
        role: member.role,
      })),
    }));
  }
}

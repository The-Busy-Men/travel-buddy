import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { GroupService } from 'src/features/group/group.service';
import { CreateGroupDto, GroupDto, UpdateGroupDto } from '../dto/group.dto';
import { UUID } from 'crypto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Groups')
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  // Endpoint to create a group
  @Post()
  async createGroup(@Body() groupDto: CreateGroupDto) {
    return await this.groupService.createGroup(
      groupDto.groupName,
      groupDto.userId,
    );
  }

  // Endpoint to add a user to a group
  @Post(':groupId/add-user')
  async addUserToGroup(
    @Param('groupId') groupId: UUID,
    @Body() groupDto: GroupDto,
  ) {
    await this.groupService.addUserToGroup(groupId, groupDto.userId);
    return { message: 'User added to the group successfully.' };
  }

  // Endpoint to change a user's role in a group
  @Post(':groupId/change-role')
  async changeUserRole(
    @Param('groupId') groupId: UUID,
    @Body() groupDto: UpdateGroupDto,
  ) {
    await this.groupService.changeUserRoleInGroup(
      groupId,
      groupDto.userId,
      groupDto.role,
    );
    return { message: 'User role updated successfully.' };
  }

  @Get(':groupId')
  async getGroupById(@Param('groupId') groupId: UUID) {
    return await this.groupService.getGroupById(groupId);
  }

  @Get()
  async getAllGroups() {
    return await this.groupService.getAllGroups();
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { GroupRoles } from 'src/entities/utils/groupRoles.type';

export class CreateGroupDto {
  @ApiProperty({ description: 'Name of the group', required: true })
  @IsString()
  groupName: string;

  @ApiProperty({
    description: 'ID of the User creating the Group',
    required: true,
  })
  @IsUUID()
  userId: UUID;
}

export class GroupDto {
  @ApiProperty({
    description: 'ID of the User creating the Group',
    required: true,
  })
  @IsUUID()
  userId: UUID;
}

export class UpdateGroupDto extends GroupDto {
  @ApiProperty({
    description: 'Name of the Role',
    required: true,
    enum: GroupRoles,
  })
  role: GroupRoles;
}

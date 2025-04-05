import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsObject, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { ApprovalStatus } from 'src/entities/utils/approvalStatus.type';

export class NewApprovalDto {
  @ApiProperty({ description: 'Type of Object', required: true })
  @IsEnum(['hotel', 'airbnb'])
  type: 'hotel' | 'airbnb';

  @ApiProperty({
    description: 'Data of the object for future creation',
    required: true,
  })
  @IsObject()
  data: any;

  @ApiProperty({ description: 'ID of the requesting user', required: true })
  @IsUUID()
  submittedBy: UUID;
}

export class EditApprovalDto {
  @ApiProperty({ description: 'ID of the approval request', required: true })
  @IsUUID()
  approvalId: UUID;

  @ApiProperty({ description: 'New Status for the object', required: true })
  @IsEnum(ApprovalStatus)
  status: ApprovalStatus;
}

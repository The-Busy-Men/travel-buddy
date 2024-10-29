import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/core/guards/role.guard';
import { Roles } from 'src/core/decorators/role.decorator';
import { ApprovalService } from 'src/features/object/approvals/approvals.service';
import { ApprovalStatus } from 'src/entities/utils/approvalStatus.type';
import { JwtAuthGuard } from 'src/core/guards/auth.guard';
import { EditApprovalDto, NewApprovalDto } from '../dto/approval.dto';
import { UUID } from 'crypto';
import { User } from 'src/core/decorators/user.decorator';
import { JwtPayload } from 'jsonwebtoken';

@ApiTags('Approvals')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('approvals')
export class ApprovalsController {
  constructor(private readonly approvalService: ApprovalService) {}

  @Get()
  @Roles('admin')
  @ApiResponse({
    status: 200,
    description: 'Get all approval requests by status',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. You do not have the required role to access this resource.',
  })
  getAllApprovalsByStatus(@Query('status') status?: string | string[]) {
    const statusArray: ApprovalStatus[] = Array.isArray(status)
      ? status.map((s) => s.trim() as ApprovalStatus)
      : status
        ? [status.trim() as ApprovalStatus]
        : [];

    return this.approvalService.getAllApprovalsByStatus(statusArray);
  }

  @Get('/self')
  @Roles('user')
  @ApiResponse({
    status: 200,
    description: 'Get all submitted requests by a user',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. You need to log in to access this resource.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. You do not have the required role to access this resource.',
  })
  getApprovalsByUser(@User() user: JwtPayload) {
    const userId = user.id as UUID;
    return this.approvalService.getApprovalsByUser(userId);
  }

  @Post()
  @Roles('user')
  @ApiResponse({ status: 201, description: 'Create new approval request' })
  submitApproval(@Body() newApprovalDto: NewApprovalDto) {
    return this.approvalService.submitApproval(newApprovalDto);
  }

  @Post('edit')
  @Roles('admin')
  @ApiResponse({
    status: 200,
    description: 'Edit approval request',
  })
  editApproval(
    @User() user: JwtPayload,
    @Body() editApprovalDto: EditApprovalDto,
  ) {
    return this.approvalService.editApproval(user.id, editApprovalDto);
  }
}

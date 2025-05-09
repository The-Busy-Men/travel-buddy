import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/features/auth/auth.module';
import { ApprovalService } from './approvals.service';
import { PendingApproval } from 'src/entities/approval.entity';
import { ApprovalsController } from 'src/api/controllers/approvals.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PendingApproval]), AuthModule],
  controllers: [ApprovalsController],
  providers: [ApprovalService],
  exports: [ApprovalService],
})
export class ApprovalModule {}

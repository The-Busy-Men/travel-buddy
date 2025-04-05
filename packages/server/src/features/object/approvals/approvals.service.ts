import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { EditApprovalDto, NewApprovalDto } from 'src/api/dto/approval.dto';
import { PendingApproval } from 'src/entities/approval.entity';
import { ApprovalStatus } from 'src/entities/utils/approvalStatus.type';
import { In, Repository } from 'typeorm';

@Injectable()
export class ApprovalService {
  constructor(
    @InjectRepository(PendingApproval)
    private readonly approvalRepository: Repository<PendingApproval>,
  ) {}

  async getAllApprovalsByStatus(statuses?: ApprovalStatus[]) {
    const whereCondition =
      statuses && statuses.length > 0 ? { status: In(statuses) } : {};

    return await this.approvalRepository.find({
      where: whereCondition,
      relations: ['submittedBy', 'editedBy'],
      select: {
        submittedBy: { id: true, email: true },
        editedBy: { id: true, email: true, roles: true },
      },
    });
  }

  async getApprovalsByUser(userId: UUID) {
    return await this.approvalRepository.find({
      where: { submittedBy: { id: userId } },
      relations: ['submittedBy', 'editedBy'],
      select: {
        submittedBy: { id: true, email: true },
        editedBy: { id: true, email: true, roles: true },
      },
    });
  }

  async getApprovalById(approvalId: UUID) {
    return await this.approvalRepository.findOneBy({ id: approvalId });
  }

  async submitApproval(data: NewApprovalDto) {
    return await this.approvalRepository.save({
      type: data.type,
      data: data.data,
      submittedBy: { id: data.submittedBy },
      status: ApprovalStatus.pending,
    });
  }

  async editApproval(userId, data: EditApprovalDto) {
    await this.approvalRepository.update(
      { id: data.approvalId },
      { status: data.status, editedBy: { id: userId } },
    );
    return `Approval (${data.approvalId}) has been set to '${data.status}'`;
  }
}

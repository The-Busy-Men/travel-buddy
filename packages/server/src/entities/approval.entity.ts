import { UUID } from 'crypto';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { ApprovalStatus } from './utils/approvalStatus.type';

@Entity()
export class PendingApproval {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'enum', enum: ['hotel', 'airbnb'] })
  type: 'hotel' | 'airbnb';

  @Column({ type: 'jsonb' })
  data: any;

  @Column({
    type: 'enum',
    enum: ApprovalStatus,
    default: ApprovalStatus.pending,
  })
  status: ApprovalStatus;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  submittedBy: User;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  editedBy: User;
}

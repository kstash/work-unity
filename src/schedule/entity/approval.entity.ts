import { Event } from 'src/schedule/entity/event.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from 'src/user/enitity/profile.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export enum ApprovalType {
  WAITING = 'waiting', // 대기중
  APPROVED = 'approved', // 승인
  REJECTED = 'rejected', // 거절
  CANCELED = 'canceled', // 요청자가 취소함
  EXPIRED = 'expired', // event.startedAt > Date.now()
}

@Entity('approval')
export class Approval extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '결재 요청 이벤트', type: () => Event })
  @ManyToOne(() => Event, (event) => event.approvals)
  event!: Event;
  @ApiProperty({ description: '결재자', type: () => Profile })
  @ManyToOne(() => Profile, (profile) => profile.approvals)
  profile!: Profile;
  // -------------------------------------------------------------------------
  @ApiPropertyOptional({ description: '결재 유형', type: () => ApprovalType })
  @Column({ type: 'enum', enum: ApprovalType, default: ApprovalType.WAITING })
  type: ApprovalType;
  @ApiProperty({ description: '결재 순서', type: () => Number })
  @Column()
  order!: number;
  @ApiPropertyOptional({
    description: '결재 관련 작성 메세지',
    type: () => String,
    required: false,
  })
  @Column({ nullable: true })
  message?: string;
  // -------------------------------------------------------------------------a
  @ApiProperty({ description: '생성일자', example: faker.date.recent() })
  @CreateDateColumn()
  createdAt: Date;
  @ApiPropertyOptional({ description: '수정일자', example: faker.date.soon() })
  @UpdateDateColumn()
  updatedAt: Date;
}

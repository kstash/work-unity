import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export enum LeaveType {
  ANNUAL = 'annual', // 연차 휴가 (일반)
  COMPENSATION = 'compensation', // 보상 휴가
  SICK = 'sick', // 질병 휴가(병가)
  MARRIAGE = 'marriage', // 결혼 휴가
  MATERNITY = 'maternity', // 출산 휴가
  PATERNITY = 'paternity', // 배우자 출산 휴가
  CESSATION = 'cessation', // 가족 돌봄 휴가
  MENSTRUATION = 'menstruation', // 생리 휴가
  FUNERAL = 'funeral', // 장례식 휴가
  OTHER = 'other', // 그 외
}

@Entity('leave')
@Unique('create_leave_restraint', ['profile', 'type'])
export class Leave extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '프로필', type: () => Profile, required: true })
  @ManyToOne(() => Profile, (profile) => profile.leaves)
  @JoinColumn()
  profile!: Profile;
  // -------------------------------------------------------------------------
  @ApiProperty({
    description: '휴가 유형',
    example: LeaveType.ANNUAL,
    required: true,
  })
  @Column({ type: 'enum', enum: LeaveType, nullable: false })
  type!: LeaveType;
  @ApiProperty({
    description: '시작 유효일자',
    required: true,
    example: faker.date.soon(),
  })
  @Column()
  startedAt!: Date;
  @ApiProperty({
    description: '마감 유효일자',
    required: true,
    example: faker.date.future(),
  })
  @Column()
  expiredAt!: Date;
  @ApiProperty({
    description: '총 보유 시간(초)',
    required: true,
    example: faker.number.int({ min: 0, max: 3600 * 7 * 15 }),
  })
  @Column()
  totalTime!: number;
  @ApiPropertyOptional({
    description: '총 사용 시간(초)',
    example: faker.number.int({ min: 0, max: 3600 * 7 * 15 }),
  })
  @Column({ default: 0 })
  usedTime?: number;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '생성일자', example: faker.date.past() })
  @CreateDateColumn()
  createdAt: Date;
  @ApiProperty({ description: '수정일자', example: faker.date.recent() })
  @UpdateDateColumn()
  updatedAt: Date;
}

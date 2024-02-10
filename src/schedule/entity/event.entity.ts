import { Approval } from './approval.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from 'src/user/enitity/profile.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export enum EventType {
  WORK = 'work',
  LEAVE = 'leave',
  MEETING = 'meeting',
}

@Entity('event')
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '이벤트를 발동한 사용자', type: () => Profile })
  @ManyToOne(() => Profile, (profile) => profile.events)
  profile!: Profile;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '이벤트 유형', enum: EventType, required: true })
  @Column({ type: 'enum', enum: EventType })
  type!: EventType;
  @ApiPropertyOptional({ description: '총 시간', required: false })
  @Column({ nullable: true })
  total?: number;
  @ApiPropertyOptional({
    description: '시작 시간',
    required: false,
    example: faker.date.recent(),
  })
  @Column({ nullable: true })
  startedAt?: Date;
  @ApiPropertyOptional({
    description: '종료 시간',
    required: false,
    example: faker.date.soon(),
  })
  @Column({ nullable: true })
  finishedAt?: Date;

  @ApiProperty({ description: '생성일자', example: faker.date.recent() })
  @CreateDateColumn()
  createdAt: Date;
  @ApiPropertyOptional({ description: '수정일자', example: faker.date.soon() })
  @UpdateDateColumn()
  updatedAt: Date;
  // -------------------------------------------------------------------------
  @OneToMany(() => Approval, (approval) => approval.event)
  approvals: Approval[];
}

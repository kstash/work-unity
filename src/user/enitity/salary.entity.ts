import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CurrencyCode } from '../currency.enum';
import { Profile } from './profile.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

@Entity('salary')
export class Salary extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '프로필', type: Profile })
  @ManyToOne(() => Profile, (p) => p.salaries)
  profile!: Profile;
  // -------------------------------------------------------------------------
  @ApiPropertyOptional({
    description: '화폐단위',
    type: 'enum',
    enum: CurrencyCode,
    default: CurrencyCode.KRW,
  })
  @Column({ type: 'enum', enum: CurrencyCode, default: CurrencyCode.KRW })
  currency?: CurrencyCode;
  @ApiProperty({
    description: '급여액',
    type: Number,
    required: true,
    example: faker.commerce.price(),
  })
  @Column({ type: 'float' })
  pay!: number;
  @ApiProperty({
    description: '지정 급여일자',
    type: Date,
    example: faker.date.recent(),
  })
  @Column()
  payday!: Date;
  // -------------------------------------------------------------------------
  @ApiProperty({
    description: '급여 정보 생성일',
    type: Date,
    example: faker.date.recent(),
  })
  @CreateDateColumn()
  createdAt: Date;
  @ApiProperty({
    description: '급여 정보 수정일',
    type: Date,
    example: faker.date.recent(),
  })
  @UpdateDateColumn()
  updatedAt: Date;
}

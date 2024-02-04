import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NONE = 'unknown',
}

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // -------------------------------------------------------------------------
  @ApiProperty({
    description: '전화번호',
    example: faker.helpers.fromRegExp('+82 10-[0-9]{4}-[0-9]{4}'),
    required: true,
  })
  @Column({ unique: true })
  phone!: string;
  @ApiProperty({ description: '이메일', example: faker.internet.email() })
  @Column({ nullable: true })
  email?: string;
  @ApiProperty({ description: '이름', example: faker.person.fullName() })
  @Column()
  name: string;
  @ApiPropertyOptional({
    description: '성별',
    enum: Gender,
    required: false,
  })
  @Column({ type: 'enum', enum: Gender, default: Gender.NONE })
  gender?: Gender;
  @ApiProperty({
    description: '생년월일',
    example: faker.date.birthdate(),
  })
  @Column()
  birth!: Date;
  @ApiPropertyOptional({
    description: '주소',
    example: faker.location.streetAddress(),
  })
  @Column({ nullable: true })
  address?: string;
  // -------------------------------------------------------------------------
  @ApiPropertyOptional({
    description: '생성일자',
    example: faker.date.recent(),
  })
  @CreateDateColumn()
  createdAt: Date;
  @ApiPropertyOptional({
    description: '수정일자',
    example: faker.date.recent(),
  })
  @UpdateDateColumn()
  updatedAt: Date;
  // -------------------------------------------------------------------------
  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];
}

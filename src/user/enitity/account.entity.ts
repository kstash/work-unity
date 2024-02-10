import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Profile } from './profile.entity';
import { faker } from '@faker-js/faker';

@Entity('account')
@Unique('create_account_restraint', ['accountName'])
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '계정 사용자', type: () => User })
  @ManyToOne(() => User, (u) => u.accounts, { nullable: false })
  user!: User;
  // -------------------------------------------------------------------------
  @ApiProperty({
    description: '사용자 계정 ID',
    example: faker.internet.userName(),
  })
  @Column({ unique: true })
  accountName!: string;
  @ApiProperty({
    description: '사용자 계정 PW',
    example: faker.internet.password(),
  })
  @Column()
  password!: string;
  // -------------------------------------------------------------------------
  @ApiProperty({
    description: '생성일자',
    type: Date,
    example: faker.date.recent(),
  })
  @CreateDateColumn()
  createdAt: Date;
  @ApiPropertyOptional({
    description: '수정일자',
    type: Date,
    example: faker.date.soon(),
  })
  @UpdateDateColumn()
  updatedAt: Date;
  // -------------------------------------------------------------------------
  @OneToMany(() => Profile, (p) => p.account)
  profiles: Profile;
}

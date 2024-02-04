import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Team } from './team.entity';
import { Profile } from 'src/user/enitity/profile.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsEmail, IsPhoneNumber, Matches } from 'class-validator';

@Entity('company')
@Unique(['businessReg'])
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '회사명', example: faker.company.name() })
  @Column()
  name!: string;
  @ApiPropertyOptional({
    description: '주소',
    example: faker.location.streetAddress(),
    required: false,
  })
  @Column({ nullable: true })
  address?: string;
  @ApiProperty({
    description: '이메일',
    example: faker.internet.email(),
    required: true,
  })
  @Column()
  @IsEmail()
  email!: string;
  @ApiProperty({
    description: '전화번호',
    example: faker.helpers.fromRegExp('+82 10-[0-9]{4}-[0-9]{4}'),
    required: true,
  })
  @IsPhoneNumber('KR')
  @Column()
  phone!: string;
  @ApiProperty({
    description: '법인등록번호',
    example: faker.helpers.fromRegExp('[0-9]{6}-[0-9]{7}'),
    required: true,
  })
  @Matches(/^[0-9]{6}-[0-9]{7}$/)
  @Column()
  businessReg!: string;
  @ApiProperty({
    description: '사업자등록번호',
    example: faker.helpers.fromRegExp('[0-9]{3}-[0-9]{2}-[0-9]{5}'),
    required: true,
  })
  @Matches(/^[0-9]{3}-[0-9]{2}-[0-9]{5}$/)
  @Column()
  traderReg!: string;
  // -------------------------------------------------------------------------
  @OneToMany(() => Profile, (p) => p.company)
  profiles: Profile[];
  @OneToMany(() => Team, (t) => t.company)
  teams: Team[];
}

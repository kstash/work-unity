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
import { Company } from './company.entity';
import { Profile } from 'src/user/enitity/profile.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

@Entity('team')
@Unique('create_team_restraint', ['company', 'name'])
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '소속 회사', type: () => Company })
  @ManyToOne(() => Company, (company) => company.teams)
  company: Company;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '팀 이름', example: faker.commerce.department() })
  @Column()
  name!: string;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '생성일자', example: faker.date.past() })
  @CreateDateColumn()
  createdAt: Date;
  @ApiPropertyOptional({
    description: '수정일자',
    example: faker.date.recent(),
  })
  @UpdateDateColumn()
  updatedAt: Date;
  // -------------------------------------------------------------------------
  @OneToMany(() => Profile, (profile) => profile.team)
  profiles: Profile[];
}

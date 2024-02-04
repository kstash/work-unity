import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Account } from './account.entity';
import { Company } from 'src/group/entity/company.entity';
import { File } from 'src/resource/entity/file.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Team } from 'src/group/entity/team.entity';
import { Leave } from './leave.entity';
import { Event } from 'src/schedule/entity/event.entity';
import { Approval } from 'src/schedule/entity/approval.entity';
import { Salary } from './salary.entity';
import { Doc } from 'src/resource/entity/doc.entity';

export enum Authority {
  WORKER = 'worker',
  MANAGER = 'manager',
}

@Entity('profile')
@Unique('create_profile_restraint', ['account', 'company'])
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '계정', type: () => Account, required: true })
  @ManyToOne(() => Account, (account) => account.profiles)
  account!: Account;
  @ApiProperty({ description: '회사', type: () => Company, required: true })
  @ManyToOne(() => Company, (company) => company.profiles)
  company!: Company;
  @ApiPropertyOptional({
    description: '소속 팀',
    type: () => Team,
    required: false,
  })
  @ManyToOne(() => Team, (team) => team.profiles, { nullable: true })
  team?: Team;
  // -------------------------------------------------------------------------
  @ApiPropertyOptional({ description: '활성 상태', type: Boolean })
  @Column({ default: true })
  isActive?: boolean;
  @ApiPropertyOptional({ description: '회사내 권한' })
  @Column({
    type: 'enum',
    enum: Authority,
    default: Authority.WORKER,
  })
  type?: Authority;
  @ApiPropertyOptional({
    description: '주소',
    example: faker.location.streetAddress(),
  })
  @Column({ nullable: true })
  address?: string;
  // -------------------------------------------------------------------------
  @OneToMany(() => File, (image) => image.profile, { nullable: true })
  image?: File;
  @OneToMany(() => Doc, (doc) => doc.profile)
  createdDocs: Doc[];
  @OneToMany(() => File, (file) => file.profile)
  files: File[];
  @OneToMany(() => Salary, (salary) => salary.profile)
  salaries: Salary[];
  @OneToMany(() => Leave, (file) => file.profile)
  leaves: Leave[];
  @OneToMany(() => Event, (event) => event.profile)
  events: Event[];
  @OneToMany(() => Approval, (approval) => approval.profile)
  approvals: Approval[];
}

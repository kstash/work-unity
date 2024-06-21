import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from './team.entity';
import { faker } from '@faker-js/faker';
import { Profile } from 'src/user/enitity/profile.entity';

@Entity('team_invitation')
@Index(['team', 'profile'], {
  unique: true,
  where: 'acceptance IS NULL',
})
export class TeamInvitation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // -------------------------------------------------------------------------
  @ApiProperty({
    description: '초대 요청 팀',
    type: Number,
  })
  @ManyToOne(() => Team, (team) => team.invitations, {
    nullable: false,
    eager: true,
  })
  team: Team;
  @ApiProperty({
    description: '초대 받은 사용자 프로필',
    example: faker.number.int(),
  })
  @ManyToOne(() => Profile, (profile) => profile.invitations, {
    nullable: false,
    eager: true,
  })
  profile: Profile;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '초대 수락 여부', example: null })
  @Column({ default: null })
  acceptance: boolean | null;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '생성일자', example: faker.date.past() })
  @CreateDateColumn()
  createdAt: Date;
  @ApiProperty({ description: '수정일자', example: faker.date.recent() })
  @UpdateDateColumn()
  updatedAt: Date;
}

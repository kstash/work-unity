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

@Entity('team')
@Unique('unique_company_team_name_restraint', ['name', 'company'])
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // -------------------------------------------------------------------------
  @ManyToOne(() => Company, (company) => company.teams)
  company: Company;
  // -------------------------------------------------------------------------
  @Column()
  name!: string;
  // -------------------------------------------------------------------------
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  // -------------------------------------------------------------------------
  @OneToMany(() => Profile, (profile) => profile.team)
  profiles: Profile[];
}

import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Company } from './company.entity';
import { ComAccount } from 'src/user/enitity/comAccount.entity';

@Entity('company_position')
@Unique(['name', 'company'])
export class Position extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @ManyToOne(() => Company, (company) => company.positions)
  @JoinColumn({ name: 'id' })
  company: Company;

  @OneToMany(() => ComAccount, (comAccount) => comAccount.position)
  comAccounts: ComAccount[];
}

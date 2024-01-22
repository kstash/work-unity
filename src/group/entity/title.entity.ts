import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';
import { ComAccount } from 'src/user/enitity/comAccount.entity';

@Entity('company_title')
export class Title extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @ManyToOne(() => Company, (company) => company.titles, { cascade: true })
  company: Company;

  @OneToMany(() => ComAccount, (comAccount) => comAccount.title)
  comAccounts: ComAccount[];
}

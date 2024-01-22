import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ComAccount } from './comAccount.entity';

@Entity()
@Unique('create_restraint', ['accountName'])
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  accountName: string;
  @Column()
  password: string;

  @ManyToOne(() => User, (user) => user.accounts, { nullable: true })
  user: User;

  @OneToOne(() => ComAccount, (comAccount) => comAccount.account)
  comAccount: ComAccount;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}

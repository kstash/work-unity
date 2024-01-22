import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CurrencyCode } from '../currency.enum';
import { ComAccount } from './comAccount.entity';

@Entity('user_salary')
export class Salary extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'enum', enum: CurrencyCode, default: CurrencyCode.KRW })
  currency: CurrencyCode;
  @Column()
  pay: number;
  @Column()
  payday: Date;

  @ManyToOne(() => ComAccount, (comAccount) => comAccount.salaries, {
    onDelete: 'CASCADE',
  })
  comAccount: ComAccount;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}

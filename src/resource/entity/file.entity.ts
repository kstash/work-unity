import { ComAccount } from 'src/user/enitity/comAccount.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('file')
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url: string;
  @Column()
  size: number;
  @Column()
  width: number;
  @Column()
  height: number;
  @Column()
  name: string;
  @Column()
  ext: string;

  @ManyToOne(() => ComAccount, (comAccount) => comAccount.files, {
    cascade: true,
  })
  uploadedBy: ComAccount;

  @OneToOne(() => ComAccount, (comAccount) => comAccount.image)
  comAccount: ComAccount;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}

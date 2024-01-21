import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { ComAccount } from "./comAccount.entity";

@Entity()
@Unique('create_restraint', ['accountName'])
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    accountName: string;
    @Column()
    password: string;

    @ManyToOne(() => User, user => user.accounts, { nullable: true })
    user: User;

    @OneToMany(() => ComAccount, comAccount => comAccount.account)
    comAccounts: ComAccount[];

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
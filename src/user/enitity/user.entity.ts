import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./account.entity";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Account, (account) => account.user)
    accounts: Account[];

    @Column({ unique: true })
    phone: string;
    @Column()
    email: string;

    @Column()
    name: string;
    @Column({ type: 'enum', enum: Gender, nullable: true })
    gender?: Gender;
    @Column()
    birth: Date;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
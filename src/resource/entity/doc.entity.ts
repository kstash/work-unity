import { Account } from "src/user/enitity/account.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('document')
export class Doc extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    content: string;

    @ManyToOne(() => Account, (account) => account.createdDocs)
    createdBy: Account;
    @ManyToOne(() => Account, (account) => account.updatedDocs)
    updatedBy: Account;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
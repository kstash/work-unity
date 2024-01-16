import { Account } from "src/user/enitity/account.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @ManyToOne(() => Account, account => account.files, { cascade: true })
    account: Account;

    @OneToOne(() => Account, account => account.profileImage)
    profileAccount: Account;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
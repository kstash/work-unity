import { ComAccount } from "src/user/enitity/comAccount.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('document')
export class Doc extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    content: string;

    @ManyToOne(() => ComAccount, (comAccount) => comAccount.createdDocs)
    createdBy: ComAccount;
    @ManyToOne(() => ComAccount, (comAccount) => comAccount.updatedDocs)
    updatedBy: ComAccount;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
import { Account } from "src/user/enitity/account.entity";
import { Approval } from "./approval.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ComAccount } from "src/user/enitity/comAccount.entity";

export enum EventType {
    WORK = 'work',
    LEAVE = 'leave',
    MEETING = 'meeting',
}

@Entity()
export class Event extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'enum', enum: EventType })
    type: EventType;
    @Column({ nullable: true })
    total: number;
    @Column()
    startedAt: Date;
    @Column({ nullable: true })
    finishedAt: Date;

    @ManyToOne(() => ComAccount, comAccount => comAccount.events, { onDelete: 'CASCADE' })
    createdBy: ComAccount;

    @OneToMany(() => Approval, approval => approval.event)
    approvals: Approval[];

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
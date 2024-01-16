import { Account } from "src/user/enitity/account.entity";
import { Approval } from "./approval.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum EventType {
    WORK = 'work',
    LEAVE = 'leave',
    MEETING = 'meeting',
}

@Entity()
export class Event extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    type: EventType;
    @Column({ nullable: true })
    total: number;
    @Column()
    startedAt: Date;
    @Column({ nullable: true })
    finishedAt: Date;

    @ManyToOne(() => Account, account => account.events, { onDelete: 'CASCADE' })
    account: Account;

    @OneToMany(() => Approval, approval => approval.event)
    approvals: Approval[];

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
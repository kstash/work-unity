import { Account } from "src/user/enitity/account.entity";
import { Event } from "src/schedule/entity/event.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum ApprovalType {
    WAITING = 'waiting',    // 대기중
    APPROVED = 'approved',  // 승인
    REJECTED = 'rejected',  // 거절
    CANCELED = 'canceled',  // 요청자가 취소함
    EXPIRED = 'expired',    // event.startedAt > Date.now() 
}

@Entity()
export class Approval extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    type: ApprovalType;
    @Column()
    order: number;
    @Column({ default: null })
    message: string;

    @ManyToOne(() => Event, (event) => event.approvals, { onDelete: 'CASCADE' })
    event: Event;
    @ManyToOne(() => Account, (account) => account.approvals, { onDelete: 'CASCADE' })
    account: Account;
    
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
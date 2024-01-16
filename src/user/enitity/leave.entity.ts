import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./account.entity";

export enum LeaveType {
    ANNUAL = 'annual',              // 연차 휴가 (일반)
    COMPENSATION = 'compensation',  // 보상 휴가
    SICK = 'sick',                  // 질병 휴가(병가)
    MARRIAGE = 'marriage',          // 결혼 휴가
    MATERNITY = 'maternity',        // 출산 휴가
    PATERNITY = 'paternity',        // 배우자 출산 휴가
    CESSATION = 'cessation',        // 가족 돌봄 휴가
    MENSTRUATION = 'menstruation',  // 생리 휴가
    FUNERAL = 'funeral',            // 장례식 휴가
    OTHER = 'other'                 // 그 외
}

@Entity()
export class Leave extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    type: LeaveType;
    @Column()
    startedAt: Date;
    @Column()
    expiredAt: Date;
    @Column()
    total: number;

    @ManyToOne(() => Account, account => account.leaves, { onDelete: 'CASCADE' })
    account: Account;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
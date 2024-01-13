import { User } from "src/user/enitity/user.entity";
import { Company } from "src/group/company.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

export enum WorkTypeEnum {
    OFFICE = 'office',
    REMOTE = 'remote',
    AWAY = 'away'
}

@Entity()
export class Work extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @ManyToOne(type => User)
    user: User;

    @ManyToOne(type=> Company)
    company: Company

    @Column()
    type: WorkTypeEnum;

    @CreateDateColumn({ type: 'timestamp' })
    startedAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    finishedAt: Date;

    @Column()
    approval: boolean;
}
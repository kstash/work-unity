import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./account.entity";
import { Company } from "src/group/entity/company.entity";
import { File } from "src/resource/entity/file.entity";
import { Position } from "src/group/entity/position.entity";
import { Title } from "src/group/entity/title.entity";
import { Team } from "src/group/entity/team.entity";
import { Approval } from "src/schedule/entity/approval.entity";
import { Event } from "src/schedule/entity/event.entity";
import { Salary } from "./salary.entity";
import { Leave } from "./leave.entity";
import { Doc } from "src/resource/entity/doc.entity";

export enum ComAccountType {
    WORKER = 'worker',
    MANAGER = 'manager',
}

@Entity('company_account')
export class ComAccount extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ default: true })
    isActive: boolean;
    @Column({ type: 'enum', enum: ComAccountType, default: ComAccountType.WORKER })
    type: ComAccountType;

    @OneToMany(() => Leave, leave => leave.comAccount)
    leaves: Leave[]
    @OneToMany(() => Event, event => event.createdBy)
    events: Event[];
    @OneToMany(() => Approval, approval => approval.approveBy)
    approvals: Approval[];
    @OneToMany(() => Salary, salary => salary.comAccount)
    salaries: Salary[];
    @OneToMany(() => Doc, doc => doc.createdBy)
    createdDocs: Doc[]
    @OneToMany(() => Doc, doc => doc.updatedBy)
    updatedDocs: Doc[]
    @OneToMany(() => File, file => file.uploadedBy)
    files: File[];

    @OneToOne(() => File, profileImage => profileImage.comAccount, { nullable: true })
    profileImage: File;

    @ManyToOne(() => Company, company => company.comAccounts)
    company: Company;
    @ManyToOne(() => Account, account => account.comAccounts)
    account: Account;
    @ManyToOne(() => Team, team => team.comAccounts)
    team: Team;
    @ManyToOne(() => Title, title => title.comAccounts)
    title: Title;
    @ManyToOne(() => Position, position => position.comAccounts)
    position: Position;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
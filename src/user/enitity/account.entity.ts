import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Company } from "src/group/entity/company.entity";
import { Team } from "src/group/entity/team.entity";
import { Title } from "src/group/entity/title.entity";
import { Position } from "src/group/entity/position.entity";
import { Event } from "src/schedule/entity/event.entity";
import { File } from "src/resource/entity/file.entity";
import { Approval } from "src/schedule/entity/approval.entity";
import { Leave } from "./leave.entity";
import { Salary } from "./salary.entity";
import { Doc } from "src/resource/entity/doc.entity";

export enum AccountType {
    ADMIN = 'admin',
    MANAGER = 'manager'
}

export enum AccountStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'

}

@Entity()
@Unique('create_restraint', ['accountName'])
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    accountName: string;
    @Column({  })
    password: string;
    @Column({ type: 'enum', enum: AccountType, default: null })
    type: AccountType;
    @Column({ type: 'enum', enum: AccountStatus, default: AccountStatus.ACTIVE })
    status: AccountStatus;

    @ManyToOne(() => Company, (company) => company.accounts, { cascade: true })
    company: Company;
    @ManyToOne(() => Team, (team) => team.accounts, { nullable: true, cascade: true })
    team: Team;
    @ManyToOne(() => Title, (title) => title.accounts, { nullable: true, cascade: true })
    title: Title;
    @ManyToOne(() => Position, (position) => position.accounts, { nullable: true, cascade: true })
    position: Position
    @ManyToOne(() => User, (user) => user.accounts, { cascade: true })
    user: User;

    @OneToMany(() => Leave, (leave) => leave.account)
    leaves: Leave[];
    @OneToMany(() => Event, (event) => event.account)
    events: Event[];
    @OneToMany(() => File, (file) => file.account)
    files: File[];
    @OneToMany(() => Approval, (approval) => approval.account)
    approvals: Approval[];
    @OneToMany(() => Salary, (salary) => salary.account)
    salaries: Salary[];
    @OneToMany(() => Doc, (document) => document.createdBy)
    createdDocs: Doc[];
    @OneToMany(() => Doc, (document) => document.updatedBy)
    updatedDocs: Doc[];

    @OneToOne(() => File, (file) => file.profileAccount, { nullable: true })
    profileImage: File;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
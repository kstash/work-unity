import { Company } from "src/group/company.entity";
import { Team } from "src/group/team.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

export enum UserTypeEnum {
    ADMIN = 'admin',
    MANAGER = 'manager',
    USER = 'user'
}

export enum GenderEnum {
    MALE = 'male',
    FEMALE = 'female'
}

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
 
    @Column() 
    password: string;

    // admin인 경우 null
    @ManyToOne(() => Company, (company) => company.users, { eager: false })
    company: Company;

    // admin인 경우 null
    @ManyToMany(() => Team, (teams) => teams.users, { eager: false })
    teams: Team[];

    @Column()
    type: UserTypeEnum;

    @Column()
    name: string;

    @Column({ nullable: true })
    gender: GenderEnum;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    birth: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    resposibility: string;

    @Column({ nullable: true })
    position: string;

    @Column({ nullable: true })
    rank: string;

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp'})
    updatedAt: Date;
}
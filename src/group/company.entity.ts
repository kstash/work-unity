import { User } from "src/user/enitity/user.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Team } from "./team.entity";

@Entity()
export class Company extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    businessReg: string;

    @Column()
    traderReg: string

    @OneToMany(type => User, user => user.company, { eager: true })
    users: User[];

    @OneToMany(type => Team, team => team.company, { eager: true })
    teams: Team[];
}
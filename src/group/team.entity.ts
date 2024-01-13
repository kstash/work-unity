import { User } from "src/user/enitity/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";

@Entity()
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(type => User, users => users.teams, { eager: false })
    users: User[]

    @ManyToOne(type => Company, company => company.teams)
    company: Company

    @Column()
    name: string;
}
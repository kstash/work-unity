import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Team } from "./team.entity";
import { Position } from "./position.entity";
import { Title } from "./title.entity";
import { Account } from "src/user/enitity/account.entity";

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
    businessReg: string;
    @Column()
    traderReg: string

    @OneToMany(() => Account, account => account.company, { eager: true })
    accounts: Account[];
    @OneToMany(() => Team, team => team.company, { eager: true })
    teams: Team[];
    @OneToMany(() => Position, position => position.company, { eager: true })
    positions: Position[];
    @OneToMany(() => Title, title => title.company, { eager: true })
    titles: Title[];
}
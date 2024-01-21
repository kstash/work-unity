import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Team } from "./team.entity";
import { Position } from "./position.entity";
import { Title } from "./title.entity";
import { ComAccount } from "src/user/enitity/comAccount.entity";

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

    @OneToMany(() => ComAccount, comAccount => comAccount.company, { eager: true })
    comAccounts: ComAccount[];
    @OneToMany(() => Team, team => team.company, { eager: true })
    teams: Team[];
    @OneToMany(() => Position, position => position.company, { eager: true })
    positions: Position[];
    @OneToMany(() => Title, title => title.company, { eager: true })
    titles: Title[];
}
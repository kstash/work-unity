import { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Company } from "./company.entity";
import { Account } from "src/user/enitity/account.entity";

@Entity('company_position')
@Unique(['name', 'company'])
export class Position extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @ManyToOne(() => Company, company => company.positions, { cascade: true })
    @JoinColumn({ name: 'id' })
    company: Company;

    @OneToMany(() => Account, account => account.position)
    accounts: Account[]
}

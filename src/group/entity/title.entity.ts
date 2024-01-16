import { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";
import { Account } from "src/user/enitity/account.entity";

@Entity('company_title')
export class Title extends BaseEntity {
    @PrimaryColumn()
    id: number;
    @ManyToOne(() => Company, (company) => company.titles, { cascade: true })
    @JoinColumn({ name: 'id' })
    company: Company;
    @BeforeInsert()
    newId() { this.id = this.company.id }

    @Column()
    name: string;

    @OneToMany(() => Account, account => account.title)
    accounts: Account[]
}
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Company } from "./company.entity";
import { Account } from "src/user/enitity/account.entity";

@Entity('company_team')
@Unique(['name', 'company'])
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @ManyToOne(() => Company, company => company.teams, { cascade: true })
    @JoinColumn({ name: 'id' })
    company: Company;

    @OneToMany(() => Account, account => account.team)
    accounts: Account[]

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Company } from "./company.entity";
import { ComAccount } from "src/user/enitity/comAccount.entity";

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

    @OneToMany(() => ComAccount, comAccount => comAccount.team)
    comAccounts: ComAccount[]

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
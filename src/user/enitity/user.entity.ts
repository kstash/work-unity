import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./account.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { faker } from "@faker-js/faker";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    NONE = 'unknown',
}

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: '전화번호', example: faker.helpers.fromRegExp('+82 10-[0-9]{4}-[0-9]{4}') })
    @Column({ unique: true })
    phone: string;
    @ApiProperty({ description: '이메일', example: faker.internet.email() })
    @Column()
    email: string;
    
    @ApiProperty({ description: '이름', example: faker.person.fullName() })
    @Column()
    name: string;
    @ApiPropertyOptional({ enum: Gender, description: '성별' })
    @Column({ type: 'enum', enum: Gender, default: Gender.NONE })
    gender: Gender;
    @ApiProperty({ type: Date, example: '2000-01-01', description: '생년월일' })
    @Column()
    birth: Date;

    @OneToMany(() => Account, (account) => account.user)
    accounts: Account[];

    @CreateDateColumn()
    createdAt: Date;
    @ApiPropertyOptional({ type: Date, example: '2024-01-01', description: '사용자 정보 수정일시' })
    @UpdateDateColumn()
    updatedAt: Date;
}
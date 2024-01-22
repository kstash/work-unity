import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  zipcode: string;
  @Column()
  sido: string;
  @Column()
  gugun: string;
  @Column()
  dong: string;
  @Column({ nullable: true })
  extra: string;
}

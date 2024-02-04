import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  // Unique,
} from 'typeorm';

@Entity('company_position')
// @Unique(['name', 'company'])
export class Position extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}

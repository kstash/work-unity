import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  // Unique,
} from 'typeorm';

@Entity('position')
// @Unique(['name', 'company'])
export class Position extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}

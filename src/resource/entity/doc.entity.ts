import { Profile } from 'src/user/enitity/profile.entity';
import { File } from './file.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

@Entity('document')
export class Doc extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '프로필', type: () => Profile })
  @ManyToOne(() => Profile, (a) => a.createdDocs)
  profile!: Profile;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '제목', example: faker.lorem.sentence() })
  @Column()
  title!: string;
  @ApiPropertyOptional({
    description: '내용',
    example: faker.lorem.paragraphs(),
    required: false,
  })
  @Column({ nullable: true })
  content?: string;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '생성일자', example: faker.date.past() })
  @CreateDateColumn()
  createdAt: Date;
  @ApiPropertyOptional({ description: '수정일자', example: faker.date.past() })
  @UpdateDateColumn()
  updatedAt: Date;
  @ApiPropertyOptional({ description: '삭제일자', example: faker.date.past() })
  @DeleteDateColumn()
  deletedAt?: Date;
  // -------------------------------------------------------------------------
  @OneToMany(() => File, (file) => file.doc)
  files: File[];
}

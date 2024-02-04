import { Profile } from 'src/user/enitity/profile.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doc } from './doc.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

@Entity('file')
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '파일 업로더', type: () => Profile })
  @ManyToOne(() => Profile, (profile) => profile.files)
  profile!: Profile;
  @ManyToOne(() => Doc, (doc) => doc.files, { nullable: true })
  @JoinColumn({ name: 'docId', referencedColumnName: 'id' })
  doc?: Doc;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '경로', example: faker.system.filePath() })
  @Column()
  path!: string;
  @ApiProperty({
    description: '크기(byte)',
    example: faker.number.int({ min: 10000 }),
  })
  @Column()
  size!: number;
  @ApiProperty({ description: '이름', example: faker.system.fileName() })
  @Column()
  name!: string;
  @ApiPropertyOptional({
    description: '확장자',
    example: faker.system.commonFileExt(),
  })
  @Column({ nullable: true })
  ext!: string;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '업로드일자', example: faker.date.past() })
  @CreateDateColumn()
  createdAt: Date;
  @ApiPropertyOptional({ description: '삭제일자', example: faker.date.past() })
  @DeleteDateColumn()
  deletedAt?: Date;
}

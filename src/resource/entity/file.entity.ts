import { Profile } from 'src/user/enitity/profile.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
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
  @ManyToOne(() => Profile, (profile) => profile.files, { nullable: true })
  profile?: Profile;
  @ApiPropertyOptional({ description: '연관 문서', type: () => Doc })
  @ManyToOne(() => Doc, (doc) => doc.files, { nullable: true })
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
  @ApiProperty({
    description: '관리용 파일명',
    example: Date.now() + '.' + faker.system.fileExt(),
  })
  @Column()
  name!: string;
  @ApiProperty({
    description: '기존 파일명',
    example: faker.system.commonFileName(),
  })
  @Column()
  originalname!: string;
  @ApiPropertyOptional({
    description: '확장자명',
    example: faker.system.commonFileExt(),
  })
  @Column({ nullable: true })
  ext?: string;
  // -------------------------------------------------------------------------
  @ApiProperty({ description: '생성일자', example: faker.date.past() })
  @CreateDateColumn()
  createdAt: Date;
}

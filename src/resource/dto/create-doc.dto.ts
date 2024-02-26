import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDocDto {
  @ApiProperty({
    description: '제목',
    example: faker.lorem.sentence({ min: 1, max: 50 }),
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  title!: string;

  @ApiPropertyOptional({
    description: '내용',
    example: faker.lorem.paragraph(),
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  @Type(() => Object)
  attachments?: any[];

  constructor(data: CreateDocDto) {
    Object.assign(this, data);
  }
}

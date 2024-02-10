import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ description: '회사명', example: faker.company.name() })
  @MinLength(1)
  name: string;

  @ApiPropertyOptional({
    description: '이메일',
    example: faker.internet.email(),
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '전화번호',
    example: faker.helpers.fromRegExp('+82 10-[0-9]{4}-[0-9]{4}'),
  })
  @IsPhoneNumber('KR')
  phone: string;

  @ApiPropertyOptional({
    description: '주소',
    example: faker.location.streetAddress(),
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: '법인등록번호',
    example: faker.helpers.fromRegExp('[0-9]{6}-[0-9]{7}'),
  })
  @Length(14, 14, {
    message: 'businessReg must be 14 characters including hyphens',
  })
  @Matches(/^[0-9]{6}-[0-9]{7}$/)
  businessReg: string;

  @ApiProperty({
    description: '사업자등록번호',
    example: faker.helpers.fromRegExp('[0-9]{3}-[0-9]{2}-[0-9]{5}'),
  })
  @IsNotEmpty()
  @Matches(/^([0-9]{3}-[0-9]{2}-[0-9]{5})$/)
  traderReg: string;
}

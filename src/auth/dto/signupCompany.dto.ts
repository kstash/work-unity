import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, Matches } from 'class-validator';

export class SignupCompanyDto {
  @ApiProperty({ description: '회사명', example: faker.company.name() })
  @IsString()
  name!: string;

  @ApiProperty({ description: '메일', example: faker.internet.email() })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: '전화번호',
    example: faker.helpers.fromRegExp('+82 10-[0-9]{4}-[0-9]{4}'),
  })
  @IsPhoneNumber('KR')
  phone!: string;

  @ApiProperty({
    description: '주소',
    example: faker.location.streetAddress(),
  })
  @IsString()
  address!: string;

  // TODO: 법인등록번호 관련 인증 시스템 구축 필요
  @ApiProperty({
    description: '법인등록번호',
    example: faker.helpers.fromRegExp('[0-9]{6}-[0-9]{7}'),
  })
  @IsString()
  @Matches(/^[0-9]{6}-[0-9]{7}$/)
  businessReg!: string;

  // TODO: 사업자등록번호 관련 인증 시스템 구축 필요
  @ApiProperty({
    description: '사업자등록번호',
    example: faker.helpers.fromRegExp('[0-9]{3}-[0-9]{2}-[0-9]{5}'),
  })
  @IsString()
  @Matches(/^[0-9]{3}-[0-9]{2}-[0-9]{5}$/)
  traderReg!: string;
}

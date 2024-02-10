import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';
import { Gender } from 'src/user/enitity/user.entity';

// TODO: @ApiProperty 데코레이터는 interface 에 작성후 DTO class 에서 implement 하도록 변경
export class SignupUserDto {
  @ApiProperty({ description: '이름' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: '$property must be yyyy-mm-dd format',
  })
  @IsDateString({ strict: true }, { message: 'invalid date' })
  birth!: Date;

  // TODO: 전화번호 인증하는 방법 찾기
  @ApiProperty({
    description: '전화번호',
    example: faker.helpers.fromRegExp('+82 10-[0-9]{4}-[0-9]{4}'),
  })
  @IsNotEmpty()
  @IsPhoneNumber('KR', { message: 'invalid phone number' })
  phone!: string;

  @ApiProperty({ description: '성별', enum: Gender })
  @IsNotEmpty()
  @IsEnum(Gender, { message: 'invalid gender' })
  gender!: Gender;

  // TODO: 주소 DB에서 검색 가능한지 확인
  @ApiPropertyOptional({
    description: '주소',
    example: faker.location.streetAddress(),
  })
  @IsOptional()
  address?: string;
}

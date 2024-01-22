import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Gender } from 'src/user/enitity/user.entity';

export class SignupUserDto {
  @ApiProperty({ description: '이름', example: faker.person.fullName() })
  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  name: string;
  @ApiPropertyOptional({ description: '성별', enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;
  @ApiProperty({ description: '생년월일', example: '2020-01-01' })
  @IsDateString({ strict: true }, { message: 'birth must be a valid date' })
  birth: Date;
  @ApiProperty({ description: '이메일', example: faker.internet.email() })
  @IsEmail()
  email: string;
  @ApiProperty({
    description: '전화번호',
    example: faker.helpers.fromRegExp('+82 10-[0-9]{4}-[0-9]{4}'),
  })
  @IsPhoneNumber('KR', { message: 'invalid phone number' })
  phone: string;
}

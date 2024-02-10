import { ApiPropertyOptional } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsEmail, IsOptional } from 'class-validator';
import { SigninDto } from './signin.dto';

export class SignupAccountDto extends SigninDto {
  @ApiPropertyOptional({
    description: '이메일',
    example: faker.internet.email(),
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}

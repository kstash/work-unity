import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  Validate,
} from 'class-validator';
import { IsValidProfileId } from 'src/user/validator/profile-id.validator';

export class SigninDto {
  @ApiProperty({
    description: '계정 아이디',
    example: faker.internet.userName(),
  })
  @IsNotEmpty()
  accountName!: string;

  @ApiProperty({
    description: '계정 비밀번호',
    example: faker.internet.password(),
  })
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 2,
      minSymbols: 2,
    },
    {
      message:
        'password is too weak (require at least 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 symbol)',
    },
  )
  password!: string;

  @ApiPropertyOptional({
    description: '프로필 ID',
    example: faker.number.int(),
  })
  @IsOptional()
  @Validate(IsValidProfileId)
  profileId?: number;
}

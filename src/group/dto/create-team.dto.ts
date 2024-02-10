import {
  IsInt,
  IsNotEmpty,
  MaxLength,
  Min,
  MinLength,
  Validate,
} from 'class-validator';
import { User } from 'src/user/enitity/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsValidCompanyId } from '../validator/company-id.validator';

export class CreateTeamDto {
  @ApiProperty({
    description: '팀명',
    example: faker.commerce.department(),
  })
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  name: string;

  @ApiProperty({ description: '회사 id', example: faker.number.int() })
  @IsInt()
  @Min(0)
  @Validate(IsValidCompanyId)
  companyId: number;

  user: User;
}

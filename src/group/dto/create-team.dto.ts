import { IsNotEmpty } from 'class-validator';
import { Company } from '../entity/company.entity';
import { User } from 'src/user/enitity/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class CreateTeamDto {
  @ApiProperty({ description: '팀명', example: faker.word.noun() })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '회사 id', example: faker.number.int() })
  @IsNotEmpty()
  company: Company;

  user: User;
}

import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateTeamRequest {
  @ApiProperty({
    description: '팀명',
    example: faker.commerce.department(),
  })
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  teamName: string;
}

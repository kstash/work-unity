import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsNumberString } from 'class-validator';

export class ResponseTeamInvitationDto {
  @ApiProperty({
    description: '팀 초대 승낙 여부',
    example: faker.datatype.boolean(),
  })
  @IsBoolean({ message: 'acceptance must be a boolean(true or false)' })
  acceptance: boolean;

  @ApiProperty({ description: '팀 초대 ID', example: faker.number.int() })
  @IsNumber()
  // @IsValidInvitationId()
  invitationId: number;
}

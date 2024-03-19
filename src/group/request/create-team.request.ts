import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IsInvitableProfileId } from 'src/user/validator/invitable-profile-id.validator';

export class CreateTeamRequest {
  @ApiProperty({
    description: '팀명',
    example: faker.commerce.department(),
  })
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  name: string;

  @ApiProperty({
    description: '생성하는 팀에 초대할 프로필 ID 목록',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsInt({ each: true })
  @Validate(IsInvitableProfileId, { each: true })
  profileIds: number[];
}

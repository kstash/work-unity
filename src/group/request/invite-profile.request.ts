import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InviteProfileRequest {
  @ApiProperty({
    description: '초대하려는 팀의 ID',
    example: faker.number.int(),
  })
  // 존재여부 확인
  // @Validate(IsExistTeam)
  @IsNotEmpty()
  teamId: number;

  @ApiProperty({
    description: '팀에 초대할 프로필 ID 목록',
    example: [faker.number.int()],
  })
  // 존재여부 확인
  // @Validate(IsExistProfile)
  @IsNotEmpty()
  profileId: number;
}

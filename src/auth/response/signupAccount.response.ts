import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SignupUserResponse } from './signupUser.response';

export class SignupAccountResponse {
  @ApiProperty({
    description: '생성한 계정의 ID',
    example: faker.internet.userName(),
  })
  accountName!: string;
  @ApiProperty({ description: '사용자 정보' })
  user!: SignupUserResponse;
  @ApiPropertyOptional({
    description: '계정 생성일자',
    example: faker.date.past(),
  })
  createdAt?: Date;
}

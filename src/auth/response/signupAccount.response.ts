import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SignupUserResponse } from './signupUser.response';
import { Expose } from 'class-transformer';
import { Account } from 'src/user/enitity/account.entity';

export class SignupAccountResponse {
  @ApiProperty({
    description: '계정 이름',
    example: faker.internet.userName(),
  })
  @Expose()
  accountName!: string;

  @ApiPropertyOptional({
    description: '생성일자',
    example: faker.date.past(),
  })
  @Expose()
  createdAt?: Date;

  @ApiProperty({ description: '사용자 정보' })
  @Expose()
  user: SignupUserResponse;

  constructor(account: Account) {
    this.accountName = account.accountName;
    this.createdAt = account.createdAt;
    this.user = new SignupUserResponse(account.user);

    return this;
  }
}

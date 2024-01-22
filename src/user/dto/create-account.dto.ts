import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ description: '계정 ID', example: faker.internet.userName() })
  accountName!: string;
  @ApiProperty({
    description: '계정 비밀번호',
    example: faker.internet.password(),
  })
  password!: string;

  @ApiProperty({ description: '메일', example: faker.internet.email() })
  email?: string;
}

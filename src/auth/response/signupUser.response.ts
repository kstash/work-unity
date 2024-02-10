import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Gender, User } from 'src/user/enitity/user.entity';
import { Expose } from 'class-transformer';

export class SignupUserResponse {
  @ApiProperty({ description: '사용자 이름', example: faker.person.fullName() })
  @Expose()
  name: string;

  @ApiProperty({ description: '성별', type: 'enum', enum: Gender })
  @Expose()
  gender: Gender;

  @ApiProperty({ description: '생년월일', example: faker.date.birthdate() })
  @Expose()
  birth: Date;

  @ApiProperty({ description: '전화번호', example: faker.phone.number() })
  @Expose()
  phone: string;

  @ApiPropertyOptional({
    description: '이메일',
    example: faker.internet.email(),
  })
  @Expose()
  email?: string;

  @ApiProperty({ description: '사용자 생성일자', example: faker.date.past() })
  @Expose()
  createdAt: Date;

  constructor(user: User) {
    this.name = user.name;
    this.gender = user.gender;
    this.birth = user.birth;
    this.phone = user.phone;
    this.email = user.email;
    this.createdAt = user.createdAt;
  }
}

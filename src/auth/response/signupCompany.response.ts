import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from 'src/group/entity/company.entity';

export class SignupCompanyResponse implements Partial<Company> {
  @ApiProperty({ description: '회사 이름', example: faker.company.name() })
  name: string;
  @ApiProperty({
    description: '회사 대표 이메일',
    example: faker.internet.email(),
  })
  email: string;
  @ApiProperty({ description: '회사 전화번호', example: faker.phone.number() })
  phone: string;
  @ApiProperty({
    description: '회사 주소',
    example: faker.location.streetAddress(),
  })
  address: string;
  @ApiProperty({
    description: '법인등록번호',
    example: faker.helpers.replaceCreditCardSymbols(),
  })
  businessReg: string;
  @ApiProperty({
    description: '사업자등록번호',
    example: faker.helpers.replaceCreditCardSymbols(),
  })
  traderReg: string;
  @ApiProperty({
    description: '회사 정보 생성일자',
    example: faker.date.past().toISOString(),
  })
  createdAt: Date;
}

import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class SignupCompanyDto {
    @ApiProperty({ description: '회사명', example: faker.company.name() })
    @IsString()
    name!: string;

    @ApiProperty({ description: '회사 대표 메일', example: faker.internet.email() })
    @IsEmail()
    email!: string;

    @ApiProperty({ description: '회사 전화번호', example: faker.phone.number() })
    @IsPhoneNumber('KR')
    phone!: string;

    @ApiProperty({ description: '회사 주소', example: faker.location.streetAddress() })
    @IsString()
    address!: string;

    @ApiProperty({ description: '법인등록번호', example: faker.helpers.replaceCreditCardSymbols() })
    @IsString()
    businessReg!: string;

    @ApiProperty({ description: '사업자등록번호', example: faker.helpers.replaceCreditCardSymbols() })
    @IsString()
    traderReg!: string;
}
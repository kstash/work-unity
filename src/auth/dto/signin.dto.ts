import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SigninDto {
    @ApiProperty({ description: '사용자 아이디', example: faker.internet.userName() })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    accountName: string;

    @ApiProperty({ description: '사용자 비밀번호', example: faker.internet.password({ length:20, pattern:/^[a-zA-Z0-9]*$/ }) })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, { 
        message: 'password only accepts english and number'
    })
    password: string;
}
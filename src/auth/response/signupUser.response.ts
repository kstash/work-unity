import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { faker } from "@faker-js/faker";
import { Gender } from "src/user/enitity/user.entity";

export class SignupUserResponse {
    @ApiProperty({ description: "사용자 이름", example: faker.person.fullName() })
    name: string;
    @ApiProperty({ description: "성별", type: "enum", enum: Gender })
    gender: Gender;
    @ApiProperty({ description: "생년월일", example: faker.date.birthdate() })
    birth: Date;
    @ApiProperty({ description: "이메일", example: faker.internet.email() })
    email: string;
    @ApiProperty({ description: "전화번호", example: faker.phone.number() })
    phone: string;

    @ApiProperty({ description: "사용자 생성일자", example: faker.date.past() })
    createdAt: Date;
}

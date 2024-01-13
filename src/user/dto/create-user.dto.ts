import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { GenderEnum, UserTypeEnum } from "../enitity/user.entity";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    type = UserTypeEnum.USER;

    @IsEnum(GenderEnum)
    gender: GenderEnum;

    @IsEmail()
    email: string;

    @IsDateString()
    birth: Date;

    address: string;

    responsibility: string;

    position: string;

    rank: string;
}
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Gender } from "../enitity/user.entity";

export class CreateUserDto {
    @IsNotEmpty({ message: 'name is required' })
    @IsString()
    name: string;
    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;
    @IsDateString({ strict: true }, { message: 'birth must be a valid date' })
    birth: Date;
    @IsEmail()
    email: string;
    @IsPhoneNumber('KR')
    phone: string;
}

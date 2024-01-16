import { IsNotEmptyObject, ValidateNested } from "class-validator";
import { SignInDto } from "./sign-in.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class SignUpDto extends SignInDto {
    @IsNotEmptyObject()
    @ValidateNested()
    user: CreateUserDto;
}
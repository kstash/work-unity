import { AccountType } from "../enitity/account.entity";
import { IsEnum, IsNotEmptyObject, ValidateNested } from "class-validator";
import { Optional } from "@nestjs/common";
import { User } from "../enitity/user.entity";
import { SignInDto } from "src/auth/dto/sign-in.dto";

export class CreateAccountDto extends SignInDto {
    @IsNotEmptyObject()
    @ValidateNested()
    user: User;
    @Optional()
    @IsEnum(AccountType, { message: 'type is not valid' })
    type?: AccountType;
}
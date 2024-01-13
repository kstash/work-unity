import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateCompanyDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber('KR')
    phone: string;

    @IsNotEmpty()
    address:string;

    @IsNotEmpty()
    businessReg: string;

    @IsNotEmpty()
    traderReg: string;
}

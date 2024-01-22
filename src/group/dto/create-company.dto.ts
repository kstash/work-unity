import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsPhoneNumber('KR')
  phone: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  businessReg: string;
  @IsNotEmpty()
  traderReg: string;
}

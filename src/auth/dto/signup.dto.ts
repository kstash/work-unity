import { IsObject } from 'class-validator';
import { SignupAccountDto } from './signupAccount.dto';
import { SignupUserDto } from './signupUser.dto';

export class SignupDto {
  @IsObject()
  user: SignupUserDto;
  @IsObject()
  account: SignupAccountDto;
}

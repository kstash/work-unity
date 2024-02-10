import { ValidateNested } from 'class-validator';
import { SignupAccountDto } from './signupAccount.dto';
import { SignupUserDto } from './signupUser.dto';
import { Type } from 'class-transformer';

export class SignupDto {
  @ValidateNested({ message: 'invalid user info' })
  @Type(() => SignupUserDto)
  user: SignupUserDto;

  @ValidateNested({ message: 'invalid account info' })
  @Type(() => SignupUserDto)
  account: SignupAccountDto;
}

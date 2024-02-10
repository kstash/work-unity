import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/user/enitity/account.entity';
import { AccountRepository } from 'src/user/repository/account.repository';
import { IAuthToken } from './interface/token.interface';
import { User } from 'src/user/enitity/user.entity';
import { IPayload } from './interface/payload.interface';
import { SigninDto } from './dto/signin.dto';
import { SignupUserDto } from './dto/signupUser.dto';
import { SignupCompanyDto } from './dto/signupCompany.dto';
import { Company } from 'src/group/entity/company.entity';
import { CompanyRepository } from 'src/group/repository/company.repository';
import { ProfileRepository } from 'src/user/repository/profile.repository';
import { Authority } from 'src/user/enitity/profile.entity';
import { CreateProfileDto } from 'src/user/dto/create-profile.dto';
import { SignupAccountDto } from './dto/signupAccount.dto';

@Injectable()
export class AuthService {
  constructor(
    private accountRepository: AccountRepository,
    private userRepository: UserRepository,
    private companyRepository: CompanyRepository,
    private comAccountRepository: ProfileRepository,
    private jwtService: JwtService,
  ) {}

  async signup(
    userDto: SignupUserDto,
    accountDto: SignupAccountDto,
  ): Promise<Account> {
    const user = await this.userRepository.createUser(userDto);
    const account = await this.accountRepository.createAccount(
      user,
      accountDto,
    );
    return account;
  }

  async signupCompany(
    companyInfo: SignupCompanyDto,
    account: Account,
  ): Promise<Company> {
    const company = await this.companyRepository.createCompany(companyInfo);
    const comAccountDto: CreateProfileDto = {
      account,
      company,
      type: Authority.MANAGER,
    };
    await this.comAccountRepository.createComAccount(comAccountDto);
    return company;
  }

  async signIn(dto: SigninDto): Promise<IAuthToken> {
    const { accountName, password } = dto;
    const account = await this.accountRepository.findByAccountName(accountName);

    if (account && (await bcrypt.compare(password, account.password))) {
      // Generate JWT and return it
      const payload: IPayload = {
        id: account.id,
        accountName: account.accountName,
      };
      return { accessToken: await this.jwtService.sign(payload) };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

  async tokenValidateAccount(payload: IPayload): Promise<Account> {
    const accountName = payload.accountName;
    const account = await this.accountRepository.findByAccountName(accountName);
    return account;
  }

  async getUser(account: Account): Promise<User> {
    const user = await this.userRepository.findById(account.user.id);
    return user;
  }
}

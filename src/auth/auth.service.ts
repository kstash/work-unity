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
import { ProfileAccount } from './interface/profileAccount.interface';

@Injectable()
export class AuthService {
  constructor(
    private accountRepository: AccountRepository,
    private userRepository: UserRepository,
    private companyRepository: CompanyRepository,
    private profileRepository: ProfileRepository,
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
    companyDto: SignupCompanyDto,
    account: Account,
  ): Promise<Company> {
    const company = await this.companyRepository.createCompany(companyDto);
    const profileDto: CreateProfileDto = {
      account,
      company,
      type: Authority.MANAGER,
    };
    await this.profileRepository.createProfile(profileDto);
    return company;
  }

  async signIn(dto: SigninDto): Promise<IAuthToken> {
    const { accountName, password, profileId } = dto;
    // Since column password is non-selected by default,
    // we need to select it manually by using queryBuilder
    const account = await this.accountRepository
      .createQueryBuilder('account')
      .addSelect('account.password')
      .where('account.accountName = :accountName', { accountName })
      .getOneOrFail();
    const payload: IPayload = { accountName: account.accountName };

    if (!(await bcrypt.compare(password, account.password))) {
      throw new UnauthorizedException('login failed');
    }

    if (dto.profileId) {
      const profile = await this.profileRepository.findByIdAndAccount(
        account,
        profileId,
      );
      payload.profileId = profile.id;
    }

    return {
      accessToken: await this.jwtService.sign(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      }),
      refreshToken: await this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async tokenValidate(payload: IPayload): Promise<ProfileAccount> {
    const { accountName, profileId } = payload;
    const account = (await this.accountRepository.findByAccountName(
      accountName,
    )) as ProfileAccount;
    if (profileId) {
      const profile = await this.profileRepository.findById(profileId);
      account.profile = profile;
    }
    return account;
  }

  async getUser(account: Account): Promise<User> {
    const user = await this.userRepository.findById(account.user.id);
    return user;
  }
}

import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Account, AccountType } from 'src/user/enitity/account.entity';
import { AccountRepository } from 'src/user/repository/account.repository';
import { IAuthToken } from './interface/token.interface';
import { CreateAccountDto } from 'src/user/dto/create-account.dto';
import { User } from 'src/user/enitity/user.entity';
import { IPayload } from './interface/payload.interface';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(
        private accountRepository: AccountRepository,
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(dto: SignUpDto): Promise<Account> {
        const user = await this.userRepository.createUser(dto.user);
        const { accountName, password } = dto;
        const createAccountDto: CreateAccountDto = { user, accountName, password };
        const account = await this.accountRepository.createAccount(createAccountDto);
        return account;
    }

    async signUpCompany(dto: SignUpDto): Promise<Account> {
        try {
            const user = await this.userRepository.createUser(dto.user);
            const { accountName, password } = dto;
            const createAccountDto: CreateAccountDto = { user, accountName, password, type: AccountType.MANAGER };
            const account = await this.accountRepository.createAccount(createAccountDto);
            return account;
        } catch (error) {
            throw new Error(error);
        }
    }

    async signIn(dto: SignInDto): Promise<IAuthToken> {
        const { accountName, password } = dto;
        const account = await this.accountRepository.findByAccountName(accountName);

        if ( account && await bcrypt.compare(password, account.password) ) {
            // Generate JWT and return it
            const payload: IPayload = { accountName };
            return { accessToken: await this.jwtService.sign(payload) };
        } else {
            throw new UnauthorizedException('login failed');
        }
    }

    async tokenValidateAccount(payload: IPayload): Promise<Account> {
        const account = await this.accountRepository.findByAccountName(payload.accountName);
        return account;
    }

    async getUser(account: Account): Promise<User> {
        if (!account.user) { return null; }
        const user = await this.userRepository.findById(account.user.id);
        return user;
    }
}

import { Body, Controller, Get, Logger, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Account } from 'src/user/enitity/account.entity';
import { IAuthToken } from './interface/token.interface';
import { User } from 'src/user/enitity/user.entity';
import { GetAccount } from 'src/auth/decorator/get-account.decorator';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() dto: SignUpDto): Promise<Account> {
        return this.authService.signUp(dto);
    }

    @Post('/signup/company')
    signUpCompany(@Body() dto: SignUpDto): Promise<Account> {
        return this.authService.signUpCompany(dto);
    }

    @Post('/signin')
    async signIn(@Body() dto: SignInDto, @Res() res: Response) {
        const jwt = await this.authService.signIn(dto);
        res.setHeader('Authorization', 'Bearer '+ jwt.accessToken);
        return res.json(jwt);
    }

    @Get('/account/me')
    @UseGuards(AuthGuard)
    getAccount(@GetAccount() account) {
        return this.authService.getUser(account);
    }
}

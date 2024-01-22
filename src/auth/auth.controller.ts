import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Account } from 'src/user/enitity/account.entity';
import { User } from 'src/user/enitity/user.entity';
import { GetAccount } from 'src/auth/decorator/get-account.decorator';
import { SigninDto } from './dto/signin.dto';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignupUserResponse } from './response/signupUser.response';
import { SignupUserDto } from './dto/signupUser.dto';
import { SignupAccountResponse } from './response/signupAccount.response';
import { SignupCompanyResponse } from './response/signupCompany.response';
import { Company } from 'src/group/entity/company.entity';
import { SignupCompanyDto } from './dto/signupCompany.dto';

@Controller('auth')
@ApiTags('계정 API')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup/user')
  @ApiOperation({
    summary: '개인 회원가입 1단계',
    description: '기존 회원인지 확인하기 위한 사용자 정보',
  })
  @ApiCreatedResponse({
    description: '찾거나 생성한 사용자 정보 반환',
    type: SignupUserResponse,
  })
  async signupUser(@Body() dto: SignupUserDto, @Res() res: Response) {
    const user: User = await this.authService.signupUser(dto);
    return res.status(HttpStatus.CREATED).json(SignupUserResponse.apply(user));
  }

  @Post('/signup/account')
  @ApiOperation({
    summary: '개인 회원가입 2단계',
    description: '개인 회원가입',
  })
  @ApiCreatedResponse({
    description: '계정을 생성한다.',
    type: SignupAccountResponse,
  })
  async signupAccount(@Body() dto, @Res() res: Response) {
    const account: Account = await this.authService.signupAccount(dto);
    return res.status(HttpStatus.CREATED).json(account);
  }

  @Post('/signup/company')
  @ApiOperation({ summary: '기업 회원가입', description: '기업용 회원가입' })
  @ApiCreatedResponse({
    description: '기업을 등록하고 본인의 계정을 기업에 연결한다.',
    type: SignupCompanyResponse,
  })
  @UseGuards(AuthGuard)
  async signUpCompany(@Body() dto: SignupCompanyDto, @GetAccount() account: Account, @Res() res: Response) {
    const company: Company = await this.authService.signupCompany(dto, account);
    return res.status(HttpStatus.CREATED).json(SignupAccountResponse.apply(company));
  }

  @Post('/signin')
  @ApiOperation({ summary: '로그인', description: '계정 정보로 로그인' })
  async signIn(@Body() dto: SigninDto, @Res() res: Response) {
    const jwt = await this.authService.signIn(dto);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    return res.status(HttpStatus.ACCEPTED).json(jwt);
  }

  @Get('/account/me')
  @ApiOperation({
    summary: '내 계정 정보',
    description: '내 계정 정보 가져오기',
  })
  @ApiCreatedResponse({ description: '내 계정 정보', type: User })
  @UseGuards(AuthGuard)
  getAccount(@GetAccount() account) {
    return this.authService.getUser(account);
  }
}

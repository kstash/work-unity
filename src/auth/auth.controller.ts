import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Account } from 'src/user/enitity/account.entity';
import { User } from 'src/user/enitity/user.entity';
import { GetAccount } from 'src/auth/decorator/get-account.decorator';
import { SigninDto } from './dto/signin.dto';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Company } from 'src/group/entity/company.entity';
import { SignupCompanyDto } from './dto/signupCompany.dto';
import { SignupDto } from './dto/signup.dto';
import { SignupAccountResponse } from './response/signupAccount.response';

@Controller('auth')
@ApiTags('User & Account API Endpoints')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup/user')
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: '개인 회원가입',
    description: '회원 신원 정보 및 계정 정보',
  })
  @ApiCreatedResponse({
    description: '생성된 계정 정보 반환',
    type: SignupAccountResponse,
  })
  async signupUser(@Body() dto: SignupDto, @Res() res: Response) {
    const account: Account = await this.authService.signup(
      dto.user,
      dto.account,
    );
    const signupAccountResponse = new SignupAccountResponse(account);

    return res.status(HttpStatus.CREATED).json(signupAccountResponse);
  }

  @Post('/signup/company')
  @ApiOperation({ summary: '기업 회원가입', description: '기업용 회원가입' })
  @ApiCreatedResponse({
    description: '기업을 등록하고 본인의 계정을 기업에 연결한다.',
    type: Company,
  })
  @UseGuards(AuthGuard)
  async signUpCompany(
    @Body() dto: SignupCompanyDto,
    @GetAccount() account: Account,
    @Res() res: Response,
  ) {
    const company: Company = await this.authService.signupCompany(dto, account);
    return res.status(HttpStatus.CREATED).json(company);
  }

  @Post('/signin')
  @ApiOperation({ summary: '로그인', description: '계정 정보로 로그인' })
  async signIn(@Body() dto: SigninDto, @Res() res: Response) {
    const jwt = await this.authService.signIn(dto);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    return res.status(HttpStatus.ACCEPTED).json(jwt);
  }

  @Get('/me')
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

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
import { JwtAuthGuard } from './auth.guard';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Company } from 'src/group/entity/company.entity';
import { SignupCompanyDto } from './dto/signupCompany.dto';
import { SignupDto } from './dto/signup.dto';
import { SignupAccountResponse } from './response/signupAccount.response';
import { NestedValidationPipe } from 'src/common/pipe/nested-validation.pipe';

@Controller('auth')
@ApiTags('User & Account API Endpoints')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup/user')
  @UsePipes(NestedValidationPipe)
  @ApiOperation({
    summary: '개인 회원가입',
    description: '회원 신원 정보 및 계정 정보',
  })
  @ApiCreatedResponse({
    description: '생성된 계정 정보 반환',
    type: SignupAccountResponse,
  })
  async signupUser(@Body() dto: SignupDto, @Res() res: Response) {
    const account = await this.authService.signup(dto.user, dto.account);
    return res
      .status(HttpStatus.CREATED)
      .json(new SignupAccountResponse(account));
  }

  @Post('/signup/company')
  @ApiOperation({
    summary: '기업 회원가입',
    description: '로그인한 계정으로 기업을 등록하고 해당 계정을 기업에 종속',
  })
  @ApiCreatedResponse({
    description: '등록한 기업 정보 반환',
    type: Company,
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async signUpCompany(
    @GetAccount() account: Account,
    @Body() dto: SignupCompanyDto,
    @Res() res: Response,
  ) {
    const company = await this.authService.signupCompany(dto, account);
    return res.status(HttpStatus.CREATED).json(company);
  }

  @Post('/signin')
  @ApiOperation({ summary: '로그인', description: '계정 정보로 로그인' })
  async signIn(@Body() dto: SigninDto, @Res() res: Response) {
    try {
      const jwt = await this.authService.signIn(dto);
      res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
      return res.status(HttpStatus.ACCEPTED).json(jwt);
    } catch (error) {
      throw error;
    }
  }

  @Get('/me')
  @ApiOperation({
    summary: '내 계정 정보',
    description: '내 계정 정보 가져오기',
  })
  @ApiCreatedResponse({ description: '내 계정 정보', type: User })
  @UseGuards(JwtAuthGuard)
  async getAccount(@GetAccount() account, @Res() res: Response) {
    const user = await this.authService.getUser(account);
    return res.status(HttpStatus.OK).json(user);
  }
}

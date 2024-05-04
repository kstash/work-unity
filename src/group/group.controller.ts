import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { GroupFilter } from './group.filter';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { GetAccount } from 'src/auth/decorator/get-account.decorator';
import { ProfileAccount } from 'src/auth/interface/profileAccount.interface';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Authority } from 'src/user/enitity/profile.entity';
import { CreateTeamRequest } from './request/create-team.request';
import { AuthService } from 'src/auth/auth.service';

@UseGuards(JwtAuthGuard)
@Controller('group')
@ApiTags('Group API Endpoints for Company and Team')
@UseFilters(GroupFilter)
export class GroupController {
  constructor(
    private groupService: GroupService,
    private authService: AuthService,
  ) {}

  @Get('/company')
  async getCompany(
    @GetAccount() account: ProfileAccount,
    @Res() res: Response,
  ) {
    const company = account.profile.company;
    return res.status(HttpStatus.FOUND).json(company);
  }

  @Get('/company/team')
  async getCompanyTeam(
    @GetAccount() account: ProfileAccount,
    @Res() res: Response,
  ) {
    const team = account.profile.team;
    return res.status(HttpStatus.FOUND).json(team);
  }

  @Get('/company/team/list')
  async getCompanyTeams(
    @GetAccount() account: ProfileAccount,
    @Res() res: Response,
  ) {
    const companyId = account.profile.company.id;
    const company = await this.groupService.getCompany(companyId);
    return res.status(HttpStatus.FOUND).json({ teams: company.teams });
  }

  @Post('/company/team')
  async createTeam(
    @GetAccount() account: ProfileAccount,
    @Body() body: CreateTeamRequest,
    @Res() res: Response,
  ) {
    if (account.profile.type !== Authority.MANAGER) {
      throw new UnauthorizedException('Only manager can create a team');
    }
    const { name, profileIds } = body;
    const createTeamDto: CreateTeamDto = {
      name,
      company: account.profile.company,
    };
    const team = await this.groupService.createTeam(createTeamDto);
    await this.groupService.inviteProfilesToTeam(profileIds, team);
    return res.status(HttpStatus.CREATED).json(team);
  }

  @Post('/company/:accountId')
  async inviteAccountToCompany(
    @GetAccount() account: ProfileAccount,
    @Param('accountId', ParseIntPipe) inviteeAccountId: number,
    @Res() res: Response,
  ) {
    // 타겟 계정을 본인 회사에 초대한다.
    // 초대를 제안한 사용자 프로필의 활성 여부 및 권한 유형을 확인한다. (profile.isActive===True && profile.type===Authority.MANAGER)
    const inviterProfile = account.profile;
    const inviteeAccount = await this.authService.getAccount(inviteeAccountId);

    if (inviterProfile.type !== Authority.MANAGER || !inviterProfile.isActive) {
      throw new UnauthorizedException('Only active manager can invite account');
    }

    const company = await this.groupService.inviteAccountToCompany(
      inviterProfile,
      inviteeAccount,
    );
    return res.status(HttpStatus.CREATED).json(company);
  }
}

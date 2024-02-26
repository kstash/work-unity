import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
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

@UseGuards(JwtAuthGuard)
@Controller('group')
@UseFilters(GroupFilter)
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('/company')
  getCompany(@GetAccount() account: ProfileAccount, @Res() res: Response) {
    const company = account.profile.company;
    return res.status(HttpStatus.FOUND).json(company);
  }

  @Post('/team')
  createTeam(@Body() createDto: CreateTeamDto) {
    return this.groupService.createTeam(createDto);
  }

  @Get('/team/list/:companyId')
  async getCompanyTeamList(@Param('companyId') id: number) {
    const company = await this.groupService.getCompany(id);
    return this.groupService.getCompanyTeamList(company);
  }
}

import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { GroupService } from './group.service';
import { Team } from './entity/team.entity';
import { Company } from './entity/company.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { GroupFilter } from './group.filter';

@Controller('group')
@UseFilters(GroupFilter)
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('/company/:id')
  getCompany(@Param('id') id: number): Promise<Company> {
    return this.groupService.getCompany(id);
  }

  @Post('/team')
  createTeam(@Body() createDto: CreateTeamDto): Promise<Team> {
    return this.groupService.createTeam(createDto);
  }

  @Get('/team/list/:companyId')
  async getCompanyTeamList(@Param('companyId') id: number): Promise<Team[]> {
    const company = await this.groupService.getCompany(id);
    return this.groupService.getCompanyTeamList(company);
  }
}

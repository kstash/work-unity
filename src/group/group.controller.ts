import { Body, Controller, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Team } from './team.entity';
import { Company } from './company.entity';
import { CreateTeamDto } from './dto/create-team.dto';

@Controller('group')
export class GroupController {
    constructor(private groupService: GroupService) {}

    @Post('/company')
    createCompany(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
        return this.groupService.createCompany(createCompanyDto);
    }

    @Post('/team')
    createTeam(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
        return this.groupService.createTeam(createTeamDto);
    }
}

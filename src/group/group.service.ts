import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyRepository } from './company.repository';
import { Company } from './company.entity';
import { TeamRepository } from './team.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './team.entity';

@Injectable()
export class GroupService {
    constructor(
        private readonly companyRepository: CompanyRepository,
        private readonly teamRepository: TeamRepository,
    ) {}

    async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
        return this.companyRepository.createCompany(createCompanyDto);
    }

    async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
        return this.teamRepository.createTeam(createTeamDto);
    }
}

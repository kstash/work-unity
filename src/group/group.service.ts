import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyRepository } from './repository/company.repository';
import { Company } from './entity/company.entity';
import { TeamRepository } from './repository/team.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entity/team.entity';

@Injectable()
export class GroupService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly teamRepository: TeamRepository,
  ) {}

  async createCompany(createDto: CreateCompanyDto): Promise<Company> {
    return this.companyRepository.createCompany(createDto);
  }

  async getCompany(id: number): Promise<Company> {
    return this.companyRepository.findOneByOrFail({ id });
  }

  async createTeam(createDto: CreateTeamDto): Promise<Team> {
    return this.teamRepository.createTeam(createDto);
  }

  async getCompanyTeamList(company: Company): Promise<Team[]> {
    return this.teamRepository.findBy({ company: { id: company.id } });
  }
}

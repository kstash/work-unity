import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyRepository } from './repository/company.repository';
import { Company } from './entity/company.entity';
import { TeamRepository } from './repository/team.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entity/team.entity';
import { ProfileRepository } from 'src/user/repository/profile.repository';
import { In } from 'typeorm';
import { Profile } from 'src/user/enitity/profile.entity';

@Injectable()
export class GroupService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly teamRepository: TeamRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async createCompany(createDto: CreateCompanyDto): Promise<Company> {
    return this.companyRepository.createCompany(createDto);
  }

  getCompany(id: number): Promise<Company> {
    const company = this.companyRepository.findOneByOrFail({ id });
    return company;
  }

  createTeam(createDto: CreateTeamDto): Promise<Team> {
    return this.teamRepository.createTeam(createDto);
  }

  async inviteProfiles(profileIds: number[], team: Team): Promise<Profile[]> {
    // TODO: 작업 완료후 초대 기능이 동작할 수 있도록 수락 기능과 같은 관련 내용 추가
    const profiles = await this.profileRepository
      .findBy({ id: In(profileIds) })
      .then((profiles) => {
        const updatedProfiles = profiles.map((profile) => {
          profile.team = team;
          return this.profileRepository.save(profile);
        });
        return Promise.all(updatedProfiles);
      });
    return profiles;
  }
}

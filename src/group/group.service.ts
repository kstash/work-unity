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
import { Account } from 'src/user/enitity/account.entity';

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

  deleteTeam(teamId: number): Promise<void> {
    this.teamRepository.delete({ id: teamId });
    return;
  }

  async inviteProfileToTeam(profileId: number, team: Team): Promise<Profile> {
    const profile = await this.profileRepository.findOneByOrFail({
      id: profileId,
    });
    if (profile.team) {
      throw new Error('Profile is already in a team');
    }
    profile.team = team;
    return this.profileRepository.save(profile);
  }

  // 해당 사용자에 대해서 companyId를 가지는 profile을 하나 생성해줍니다.
  async inviteAccountToCompany(
    inviterProfile: Profile,
    inviteeAccount: Account,
  ): Promise<Profile> {
    const dto = {
      account: inviteeAccount,
      company: inviterProfile.company,
    };
    const inviteeProfile = await this.profileRepository.createProfile(dto);

    return inviteeProfile;
  }
}

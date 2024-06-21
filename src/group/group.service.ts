import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyRepository } from './repository/company.repository';
import { Company } from './entity/company.entity';
import { TeamRepository } from './repository/team.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entity/team.entity';
import { ProfileRepository } from 'src/user/repository/profile.repository';
import { Profile } from 'src/user/enitity/profile.entity';
import { Account } from 'src/user/enitity/account.entity';
import { TeamInvitation } from './entity/team_invitation.entity';
import { TeamInvitationRepository } from './repository/team-invitation.repository';
import { CreateTeamInvitationDto } from './dto/create-team-invitation.dto';
import { CreateProfileDto } from 'src/user/dto/create-profile.dto';

@Injectable()
export class GroupService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly teamRepository: TeamRepository,
    private readonly teamInvitationRepository: TeamInvitationRepository,
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

  async getTeam(id: number): Promise<Team> {
    const team = await this.teamRepository.findOneByOrFail({ id });
    return team;
  }

  deleteTeam(teamId: number): Promise<void> {
    this.teamRepository.delete({ id: teamId });
    return;
  }

  async createTeamInvitation(
    teamId: number,
    inviteeId: number,
  ): Promise<TeamInvitation> {
    try {
      const team = await this.teamRepository.findById(teamId);
      const invitee = await this.profileRepository.findCompanyProfile(
        team.company.id,
        inviteeId,
      );
      const dto = new CreateTeamInvitationDto(team, invitee);
      const invitation = await this.teamInvitationRepository.createOne(dto);
      return invitation;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async responseTeamInvitation(
    invitationId: number,
    acceptance: boolean,
  ): Promise<TeamInvitation> {
    try {
      const invitation =
        await this.teamInvitationRepository.findById(invitationId);
      await this.teamInvitationRepository.update(invitation.id, { acceptance });
      if (acceptance) {
        await this.profileRepository.updateTeam(
          invitation.profile.id,
          invitation.team,
        );
      }
      const result = await this.teamInvitationRepository.findById(invitationId);
      return result;
    } catch (error) {
      throw new NotFoundException(error);
    }
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

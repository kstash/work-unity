import { Profile } from 'src/user/enitity/profile.entity';
import { Team } from '../entity/team.entity';

export class CreateTeamInvitationDto {
  team: Team;
  profile: Profile;

  constructor(team: Team, profile: Profile) {
    this.team = team;
    this.profile = profile;
  }
}

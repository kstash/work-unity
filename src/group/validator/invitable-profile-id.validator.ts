import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../../user/user.service';
import { GroupService } from '../group.service';

@ValidatorConstraint({ name: 'InvitableProfileIds', async: true })
export class IsInvitableProfileIds implements ValidatorConstraintInterface {
  constructor(
    private readonly userService: UserService,
    private readonly groupService: GroupService,
  ) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const teamId: number = args.object['teamId'];
    const profileIds: number[] = args.object['profileIds'];
    const team = await this.groupService.getTeam(teamId);
    for (const profileId of profileIds) {
      const profile = await this.userService.getProfileById(profileId);
      // when company doesn't match
      if (profile.company.id !== team.company.id) return false;
      // when profile is already in a team
      if (profile.team) {
        args.constraints[0] = false;
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    if (args.constraints[0] === false) return 'Profile is already in a team.';
    return `Profiles are not in the same company.`;
  }
}

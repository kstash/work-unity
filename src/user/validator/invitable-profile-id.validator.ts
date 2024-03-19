import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';

@ValidatorConstraint({ name: 'isInvitableProfileId', async: true })
export class IsInvitableProfileId implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(invitableProfileId: number): Promise<boolean> {
    const profile = await this.userService.getProfileById(invitableProfileId);
    const isInvitable =
      profile &&
      profile.isActive &&
      profile.company !== null &&
      profile.team === null;
    return isInvitable;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Profile with ID ${validationArguments.value} is not invitable.`;
  }
}

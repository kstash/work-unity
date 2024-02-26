import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UserService } from '../user.service';

@ValidatorConstraint({ name: 'isValidProfileId', async: true })
export class IsValidProfileId implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(profileId: number) {
    const profile = await this.userService.getProfileById(profileId);
    return !!profile;
  }

  defaultMessage(args: ValidationArguments) {
    return `Profile with ID ${args.value} does not exist.`;
  }
}

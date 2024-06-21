import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '../repository/profile.repository';
import { MyLogger } from 'src/logger/logger.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsValidProfileId implements ValidatorConstraintInterface {
  constructor(
    private profileRepository: ProfileRepository,
    private logger: MyLogger,
  ) {}

  async validate(value: number): Promise<boolean> {
    try {
      const profile = await this.profileRepository.findById(value);
      return !!profile;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Profile with ID ${args.value} does not exist.`;
  }
}

export const IsValidProfile = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidProfileId,
    });
  };
};

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { GroupService } from '../group.service';

@ValidatorConstraint({ name: 'isValidCompanyId', async: true })
export class IsValidCompanyId implements ValidatorConstraintInterface {
  constructor(private readonly groupService: GroupService) {}

  async validate(companyId: number) {
    // groupService를 사용하여 companyId가 존재하는지 확인
    const company = await this.groupService.getCompany(companyId);
    return !!company;
  }

  defaultMessage(args: ValidationArguments) {
    return `Company with ID ${args.value} does not exist.`;
  }
}

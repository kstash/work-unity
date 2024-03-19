import { Company } from '../entity/company.entity';

export class CreateTeamDto {
  name: string;
  company: Company;

  constructor(name: string, company: Company) {
    this.name = name;
    this.company = company;
  }
}

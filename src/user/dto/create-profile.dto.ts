import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Account } from '../enitity/account.entity';
import { Company } from 'src/group/entity/company.entity';
import { Team } from 'src/group/entity/team.entity';
import { Authority } from '../enitity/profile.entity';

export class CreateProfileDto {
  @ApiProperty({ required: true })
  account: Account;
  @ApiProperty({ required: true })
  company: Company;
  @ApiPropertyOptional({ required: false })
  team?: Team;
  @ApiPropertyOptional({ required: false })
  address?: string;
  @ApiPropertyOptional()
  type?: Authority;
}

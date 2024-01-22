import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Account } from '../enitity/account.entity';
import { Company } from 'src/group/entity/company.entity';
import { Team } from 'src/group/entity/team.entity';
import { Address } from '../enitity/address.entity';
import { Position } from 'src/group/entity/position.entity';
import { Title } from 'src/group/entity/title.entity';
import { ComAccountType } from '../enitity/comAccount.entity';

export class CreateComAccountDto {
  @ApiProperty()
  account: Account;
  @ApiProperty()
  company: Company;
  @ApiPropertyOptional()
  team?: Team;
  @ApiPropertyOptional()
  address?: Address;
  @ApiPropertyOptional()
  position?: Position;
  @ApiPropertyOptional()
  title?: Title;
  @ApiPropertyOptional()
  type?: ComAccountType;
}

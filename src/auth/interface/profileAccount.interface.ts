import { Account } from 'src/user/enitity/account.entity';
import { Profile } from 'src/user/enitity/profile.entity';

export interface ProfileAccount extends Account {
  profile?: Profile;
}

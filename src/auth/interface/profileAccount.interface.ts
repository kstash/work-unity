import { Account } from 'src/user/enitity/account.entity';
import { Authority, Profile } from 'src/user/enitity/profile.entity';

export interface ProfileAccount extends Account {
  profile?: Profile;
}

export interface ManagerProfile extends Profile {
  isActive: true;
  type: Authority.MANAGER;
}

export interface ManagerAccount extends Account {
  profile: ManagerProfile;
}

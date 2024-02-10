import { Gender } from '../enitity/user.entity';

export class CreateUserDto {
  name: string;
  birth: Date;
  phone: string;
  gender: Gender;
  email?: string;
}

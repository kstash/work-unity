import { Gender } from '../enitity/user.entity';

export class CreateUserDto {
  name: string;
  gender?: Gender;
  birth: Date;
  email: string;
  phone: string;
}

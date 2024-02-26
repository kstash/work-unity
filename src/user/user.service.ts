import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { AccountRepository } from './repository/account.repository';
import { LeaveRepository } from './repository/leave.repository';
import { SalaryRepository } from './repository/salary.repository';
import { User } from './enitity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Profile } from './enitity/profile.entity';
import { ProfileRepository } from './repository/profile.repository';
import { File } from 'src/resource/entity/file.entity';
import { removeFile } from 'src/util/file.util';
import { FileRepository } from 'src/resource/repository/file.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly leaveRepository: LeaveRepository,
    private readonly salaryRepository: SalaryRepository,
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly fileRepository: FileRepository,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);
    const result = await this.userRepository.save(user);
    return result;
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOneByOrFail({ id });
  }

  getProfileById(id: number): Promise<Profile> {
    return this.profileRepository.findOneByOrFail({ id });
  }

  async updateImage(user: User, image: File): Promise<User> {
    if (user.image) removeFile(user.image.path);
    await this.fileRepository.delete(user.image.id);
    user.image = image;
    return await this.userRepository.save(user);
  }
}

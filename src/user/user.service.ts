import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { AccountRepository } from './repository/account.repository';
import { LeaveRepository } from './repository/leave.repository';
import { SalaryRepository } from './repository/salary.repository';
import { User } from './enitity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly leaveRepository: LeaveRepository,
    private readonly salaryRepository: SalaryRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);
    const result = await this.userRepository.save(user);
    return result;
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOneByOrFail({ id });
  }
}

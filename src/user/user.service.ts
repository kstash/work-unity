import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { AccountRepository } from './repository/account.repository';
import { AddressRepository } from './repository/address.repsotiroy';
import { LeaveRepository } from './repository/leave.repository';
import { SalaryRepository } from './repository/salary.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './enitity/user.entity';

@Injectable()
export class UserService {
    constructor(
        private readonly accountRepository: AccountRepository,
        private readonly addressRepository: AddressRepository,
        private readonly leaveRepository: LeaveRepository,
        private readonly salaryRepository: SalaryRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async createUser(createDto: CreateUserDto): Promise<User> {
        const { phone } = createDto;
        const user = await this.userRepository.findOneBy({ phone }) || await this.userRepository.create(createDto);
        try {
            const result = await this.userRepository.save(user);
            return result;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('User already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async getUserById(id: number): Promise<User> {
        return this.userRepository.findOneByOrFail({ id });
    }
}

import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Account } from '../enitity/account.entity';
import { User } from '../enitity/user.entity';
import { CreateAccountDto } from '../dto/create-account.dto';

@Injectable()
export class AccountRepository extends Repository<Account> {
  constructor(dataSource: DataSource) {
    super(Account, dataSource.createEntityManager());
  }

  async createAccount(dto: CreateAccountDto): Promise<Account> {
    const salt = await bcrypt.genSalt();
    dto.password = await bcrypt.hash(dto.password, salt);
    try {
      const account = this.create(dto);
      const result = this.save(account);
      return result;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Account already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findByAccountName(accountName: string): Promise<Account> {
    try {
      const result = await this.findOneOrFail({
        relations: { user: true },
        where: { accountName },
      });
      return result;
    } catch (error) {
      if (error.code === '404') {
        throw new NotFoundException('Account not found');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findUser(accountName: string): Promise<User> {
    const result = await this.findOneOrFail({
      relations: { user: true },
      where: { accountName },
    });
    return result.user;
  }
}

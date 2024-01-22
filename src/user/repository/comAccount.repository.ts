import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ComAccount } from '../enitity/comAccount.entity';
import { CreateComAccountDto } from '../dto/create-comAccount.dto';

@Injectable()
export class ComAccountRepository extends Repository<ComAccount> {
  constructor(dataSource: DataSource) {
    super(ComAccount, dataSource.createEntityManager());
  }

  async createComAccount(dto: CreateComAccountDto): Promise<ComAccount> {
    try {
      const comAccount = this.create(dto);
      const result = await this.save(comAccount);
      return result;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('ComAccount already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Profile } from '../enitity/profile.entity';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { Account } from '../enitity/account.entity';

@Injectable()
export class ProfileRepository extends Repository<Profile> {
  constructor(dataSource: DataSource) {
    super(Profile, dataSource.createEntityManager());
  }

  async createProfile(dto: CreateProfileDto): Promise<Profile> {
    try {
      const profile = this.create(dto);
      const result = await this.save(profile);
      return result;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Profile already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findByAccount(account: Account): Promise<Profile> {
    try {
      const profile = await this.findOneBy({ account: { id: account.id } });
      return profile;
    } catch (error) {
      if (error.code === 404) {
        throw new NotFoundException('Profile not found');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

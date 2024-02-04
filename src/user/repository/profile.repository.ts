import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Profile } from '../enitity/profile.entity';
import { CreateProfileDto } from '../dto/create-profile.dto';

@Injectable()
export class ProfileRepository extends Repository<Profile> {
  constructor(dataSource: DataSource) {
    super(Profile, dataSource.createEntityManager());
  }

  async createComAccount(dto: CreateProfileDto): Promise<Profile> {
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
}

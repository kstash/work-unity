import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Profile } from '../enitity/profile.entity';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { Account } from '../enitity/account.entity';
import { Team } from 'src/group/entity/team.entity';

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

  async findAllByAccount(account: Account): Promise<Profile[]> {
    try {
      const profiles = await this.findBy({ account: { id: account.id } });
      return profiles;
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException('Profile not found');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findByIdAndAccount(
    account: Account,
    profileId: number,
  ): Promise<Profile> {
    try {
      const profile = await this.findOneByOrFail({
        account: { id: account.id },
        id: profileId,
      });
      return profile;
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException('Profile not found');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findById(id: number): Promise<Profile> {
    try {
      const profile = await this.findOneByOrFail({ id });
      return profile;
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException('Profile not found');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findCompanyProfile(
    companyId: number,
    profileId: number,
  ): Promise<Profile> {
    try {
      const profile = await this.findOneByOrFail({
        id: profileId,
        company: { id: companyId },
      });
      return profile;
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException('Profile not found');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateTeam(profileId: number, team: Team) {
    const profile = await this.findById(profileId);
    if (profile.team) {
      throw new ConflictException('Profile already has a team');
    } else if (profile.company.id !== team.company.id) {
      throw new ForbiddenException('Profile is not in the same company');
    }
    await this.update(profileId, { team });
    const result = await this.findById(profileId);
    return result;
  }
}

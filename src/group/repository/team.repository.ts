import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Team } from '../entity/team.entity';
import { CreateTeamDto } from '../dto/create-team.dto';

@Injectable()
export class TeamRepository extends Repository<Team> {
  constructor(dataSoruce: DataSource) {
    super(Team, dataSoruce.createEntityManager());
  }

  async createTeam(createDto: CreateTeamDto): Promise<Team> {
    const team = this.create(createDto);
    try {
      const result = await this.save(team);
      return result;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Team already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

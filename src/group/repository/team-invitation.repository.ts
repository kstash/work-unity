import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TeamInvitation } from '../entity/team_invitation.entity';
import { CreateTeamInvitationDto } from '../dto/create-team-invitation.dto';

@Injectable()
export class TeamInvitationRepository extends Repository<TeamInvitation> {
  constructor(dataSource: DataSource) {
    super(TeamInvitation, dataSource.createEntityManager());
  }

  async createOne(dto: CreateTeamInvitationDto): Promise<TeamInvitation> {
    const invitation = this.create(dto);
    const result = await this.save(invitation);
    return result;
  }

  async findById(id: number): Promise<TeamInvitation> {
    const invitation = await this.findOneByOrFail({ id });
    return invitation;
  }
}

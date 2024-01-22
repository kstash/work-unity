import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Approval } from '../entity/approval.entity';

@Injectable()
export class ApprovalRepository extends Repository<Approval> {
  constructor(dataSource: DataSource) {
    super(Approval, dataSource.createEntityManager());
  }
}

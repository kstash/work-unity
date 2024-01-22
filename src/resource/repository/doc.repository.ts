import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Doc } from '../entity/doc.entity';

@Injectable()
export class DocRepository extends Repository<Doc> {
  constructor(dataSource: DataSource) {
    super(Doc, dataSource.createEntityManager());
  }
}

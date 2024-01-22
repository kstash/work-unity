import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { File } from '../entity/file.entity';

@Injectable()
export class FileRepository extends Repository<File> {
  constructor(dataSource: DataSource) {
    super(File, dataSource.createEntityManager());
  }
}

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Address } from '../enitity/address.entity';

@Injectable()
export class AddressRepository extends Repository<Address> {
  constructor(dataSource: DataSource) {
    super(Address, dataSource.createEntityManager());
  }
}

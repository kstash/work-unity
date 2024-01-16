import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Leave } from "../enitity/leave.entity";

@Injectable()
export class LeaveRepository extends Repository<Leave> {
    constructor(dataSource: DataSource) {
        super(Leave, dataSource.createEntityManager());
    }
}
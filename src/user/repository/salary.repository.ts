import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Salary } from "../enitity/salary.entity";

@Injectable()
export class SalaryRepository extends Repository<Salary> {
    constructor(dataSource: DataSource) {
        super(Salary, dataSource.createEntityManager());
    }
}
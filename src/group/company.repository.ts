import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Company } from "./company.entity";
import { CreateCompanyDto } from "./dto/create-company.dto";

@Injectable()
export class CompanyRepository extends Repository<Company> {
    constructor(dataSoruce: DataSource) {
        super(Company, dataSoruce.createEntityManager());
    }

    async createCompany(createCompanyDto: CreateCompanyDto): Promise<any> {
        const company = this.create(createCompanyDto);
        try {
            const result = await this.save(company);
            return result;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Company already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
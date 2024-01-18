import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "../enitity/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = this.create(dto);
        try {
            const result = this.save(user);
            return result;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('User already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async findById(id: number): Promise<User> {
        try {
            const result = await this.findOneByOrFail({ id });
            return result;
        } catch (error) {
            if (error.code === '404') {
                throw new NotFoundException('User not found');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
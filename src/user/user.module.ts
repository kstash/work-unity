import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './enitity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Account } from './enitity/account.entity';
import { AccountRepository } from './repository/account.repository';
import { AddressRepository } from './repository/address.repsotiroy';
import { LeaveRepository } from './repository/leave.repository';
import { SalaryRepository } from './repository/salary.repository';
import { UserRepository } from './repository/user.repository';
import { Address } from './enitity/address.entity';
import { Leave } from './enitity/leave.entity';
import { Salary } from './enitity/salary.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';

const jwtConfig = config.get('jwt');
const secret: string = process.env.JWT_SECRET || jwtConfig.secret;
const expiresIn: number = Number(process.env.JWT_EXPIRES_IN) || jwtConfig.expiresIn;

@Module({
    imports: [
        TypeOrmModule.forFeature([Address, Leave, Salary, User]),
        forwardRef(() => AuthModule),
        // forwardRef(() => )
        JwtModule.register({ secret, signOptions: { expiresIn } })
    ],
    controllers: [UserController],
    providers: [
        AuthService,
        UserService,
        AccountRepository,
        AddressRepository,
        LeaveRepository,
        SalaryRepository,
        UserRepository
    ],
    exports: [UserService],
})
export class UserModule {}

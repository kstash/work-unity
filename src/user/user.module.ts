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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompanyRepository } from 'src/group/repository/company.repository';
import { ComAccountRepository } from './repository/comAccount.repository';
import { ComAccount } from './enitity/comAccount.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Account, Address, Leave, Salary, User, ComAccount]),
        forwardRef(() => AuthModule),
        // forwardRef(() => )
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: configService.get<number>('JWT_EXPIRES_IN') },
            })
        })
    ],
    controllers: [UserController],
    providers: [
        AuthService,
        UserService,
        AccountRepository,
        AddressRepository,
        CompanyRepository,
        ComAccountRepository,
        LeaveRepository,
        SalaryRepository,
        UserRepository
    ],
    exports: [UserService],
})
export class UserModule {}

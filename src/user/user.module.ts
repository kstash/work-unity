import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './enitity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Account } from './enitity/account.entity';
import { AccountRepository } from './repository/account.repository';
import { LeaveRepository } from './repository/leave.repository';
import { SalaryRepository } from './repository/salary.repository';
import { UserRepository } from './repository/user.repository';
import { Leave } from './enitity/leave.entity';
import { Salary } from './enitity/salary.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompanyRepository } from 'src/group/repository/company.repository';
import { ProfileRepository } from './repository/profile.repository';
import { Profile } from './enitity/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Leave, Salary, User, Profile]),
    forwardRef(() => AuthModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<number>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    AuthService,
    UserService,
    AccountRepository,
    CompanyRepository,
    ProfileRepository,
    LeaveRepository,
    SalaryRepository,
    UserRepository,
  ],
  exports: [UserService],
})
export class UserModule {}

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
import { ResourceModule } from 'src/resource/resource.module';
import { ResourceService } from 'src/resource/resource.service';
import { DocRepository } from 'src/resource/repository/doc.repository';
import { FileRepository } from 'src/resource/repository/file.repository';
import { IsValidProfileId } from './validator/profile-id.validator';
import { MyLogger } from 'src/logger/logger.service';

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
    ResourceModule,
  ],
  controllers: [UserController],
  providers: [
    AuthService,
    UserService,
    ResourceService,
    AccountRepository,
    CompanyRepository,
    ProfileRepository,
    LeaveRepository,
    SalaryRepository,
    UserRepository,
    DocRepository,
    FileRepository,
    IsValidProfileId,
    MyLogger,
  ],
  exports: [UserService, IsValidProfileId],
})
export class UserModule {}

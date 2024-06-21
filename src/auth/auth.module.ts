import { Module } from '@nestjs/common';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../user/enitity/account.entity';
import { User } from 'src/user/enitity/user.entity';
import { AccountRepository } from 'src/user/repository/account.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompanyRepository } from 'src/group/repository/company.repository';
import { ProfileRepository } from 'src/user/repository/profile.repository';
import { HttpExceptionFilter } from 'src/common/filter/exception.filter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<number>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    HttpExceptionFilter,
    JwtStrategy,
    AuthService,
    AccountRepository,
    CompanyRepository,
    ProfileRepository,
    UserRepository,
  ],
  exports: [JwtStrategy, PassportModule, AuthService, JwtModule],
})
export class AuthModule {}

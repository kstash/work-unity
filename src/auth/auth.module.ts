import { Module } from '@nestjs/common';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt.strategy';
import * as config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../user/enitity/account.entity';
import { User } from 'src/user/enitity/user.entity';
import { AccountRepository } from 'src/user/repository/account.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserModule } from 'src/user/user.module';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    AccountRepository,
    UserRepository
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}

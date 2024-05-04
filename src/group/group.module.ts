import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/enitity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyRepository } from './repository/company.repository';
import { TeamRepository } from './repository/team.repository';
import { ProfileRepository } from 'src/user/repository/profile.repository';
import { AccountRepository } from 'src/user/repository/account.repository';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [GroupController],
  providers: [
    GroupService,
    AccountRepository,
    UserRepository,
    CompanyRepository,
    TeamRepository,
    ProfileRepository,
  ],
  exports: [GroupService],
})
export class GroupModule {}

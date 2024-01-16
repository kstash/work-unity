import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/enitity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyRepository } from './repository/company.repository';
import { TeamRepository } from './repository/team.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  controllers: [GroupController],
  providers: [GroupService, CompanyRepository, TeamRepository],
  exports: [GroupService],
})
export class GroupModule {}

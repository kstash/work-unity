import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { ScheduleModule } from './schedule/schedule.module';
import { UserModule } from './user/user.module';
import { ResourceModule } from './resource/resource.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './common/interceptor/logger.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    AuthModule,
    GroupModule,
    ScheduleModule,
    UserModule,
    ResourceModule,
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}

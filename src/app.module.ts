import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { ScheduleModule } from './schedule/schedule.module';
import { UserModule } from './user/user.module';
import { ResourceModule } from './resource/resource.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoggerInterceptor } from './common/interceptor/logger.interceptor';
import { MyLogger } from './logger/logger.service';
import { HttpExceptionFilter } from './common/filter/exception.filter';

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
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    MyLogger,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
      // useFactory: () => {
      //   new ValidationPipe({
      //     transform: true,
      //     skipNullProperties: false,
      //     skipUndefinedProperties: false,
      //     skipMissingProperties: false,
      //     forbidUnknownValues: false,
      //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      //     exceptionFactory: (errors: ValidationError[]) =>
      //       new UnprocessableEntityException({
      //         errors: errors.map((error) => ({
      //           property: error.property,
      //           constraints: error.constraints,
      //         })),
      //       }),
      //   });
      // },
    },
    // {
    //   provide: APP_GUARD,

    // }
  ],
  controllers: [],
})
export class AppModule {}

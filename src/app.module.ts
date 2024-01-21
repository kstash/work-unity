import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { ScheduleModule } from './schedule/schedule.module';
import { UserModule } from './user/user.module';
import { ResourceModule } from './resource/resource.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AddressModule } from './address/address.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('local', 'dev', 'prod', 'test').default('local'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_SYNC: Joi.boolean().required(),
        DB_CA: Joi.string().optional(),
        LOG_DIR: Joi.string().required(),
        TZ: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.number().required(),
      })
    }),
    AuthModule,
    GroupModule,
    ScheduleModule,
    UserModule,
    ResourceModule,
    DatabaseModule,
    AddressModule,
  ],
})
export class AppModule {}

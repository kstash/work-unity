import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { Logger } from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(process.env.APP_NAME, {
              prettyPrint: true,
            }),
          ),
        }),
        new winstonDaily({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.printf(
              (info) =>
                `[${info.timestamp}] ${process.env.APP_NAME}.${info.level}: ${info.message}`,
            ),
          ),
          dirname: process.env.LOG_DIR,
          filename: '%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    }),
  ],
  providers: [Logger],
  exports: [WinstonModule, Logger],
})
export class LoggerModule {}

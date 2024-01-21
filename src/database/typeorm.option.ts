import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import * as fs from "fs";
import { DataSource } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";

export const TypeOrmOptions: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: configService.get<boolean>('DB_SYNC'),
        autoLoadEntities: true,
        ssl: (configService.get('NODE_ENV') !== 'local')
            ? { ca: fs.readFileSync(configService.get('DB_CA')) }
            : false,
        extra: (configService.get('NODE_ENV') !== 'local')
            ? { rejectUnauthorized: false }
            : false
    }),
    async dataSourceFactory(option) {
        if (!option) throw new Error('Option is required');
        return addTransactionalDataSource(new DataSource(option));
    }
}
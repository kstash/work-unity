import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from "config";
import * as fs from "fs";

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
    type: process.env.DB_TYPE || dbConfig.type,
    host: process.env.DB_HOST || dbConfig.host,
    port: Number(process.env.DB_PORT) || dbConfig.port,
    username: process.env.DB_USERNAME || dbConfig.username,
    password: process.env.DB_PASSWORD || dbConfig.password,
    database: process.env.DB_NAME || dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: Boolean(process.env.DB_SYNC) || dbConfig.synchronize,
    // logging: true,
    ssl: {
        // https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html#UsingWithRDS.SSL.CertificatesAllRegions
        ca: fs.readFileSync(process.env.DB_CA || dbConfig.ca)
    },
    extra: {
        // SSL 연결 강제 설정
        ssl: { rejectUnauthorized: false }
    },
    autoLoadEntities: true,
}
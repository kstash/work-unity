import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { StorageDriver, initializeTransactionalContext } from 'typeorm-transactional';
import { configDotenv } from 'dotenv';
import { setupSwagger } from './util/swagger';

async function bootstrap() {
  // env
  configDotenv();

  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.APP_PORT);
  // swagger
  setupSwagger(app);
  await app.listen(port);

  const url = await app.getUrl();
  Logger.log(`Application is running on: ${url}`);
}
bootstrap();

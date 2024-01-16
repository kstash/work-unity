import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';
import { SwaggerModule } from '@nestjs/swagger';
import { StorageDriver, initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  const port = serverConfig.port;

  const document = SwaggerModule.createDocument(app, serverConfig);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(port);
  
  const url = await app.getUrl()
  Logger.log(`Application is running on: ${url}`);
}
bootstrap();

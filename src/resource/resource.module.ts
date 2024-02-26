import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { DocRepository } from './repository/doc.repository';
import { FileRepository } from './repository/file.repository';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dest: configService.get<string>('FILE_DIR'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ResourceController],
  providers: [ResourceService, DocRepository, FileRepository],
})
export class ResourceModule {}

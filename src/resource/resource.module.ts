import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { DocRepository } from './repository/doc.repository';
import { FileRepository } from './repository/file.repository';

@Module({
  controllers: [ResourceController],
  providers: [ResourceService, DocRepository, FileRepository],
})
export class ResourceModule {}

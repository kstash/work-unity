import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';

@Controller('resource')
export class ResourceController {
    constructor(
      private readonly resourceService: ResourceService
    ) {}

    @Post()
    createDoc(@Body() createDocDto: CreateDocDto) {
      return this.resourceService.createDoc(createDocDto);
    }

    @Get()
    findAllDoc() {
      return this.resourceService.findAllDoc();
    }

    @Get(':id')
    findOneDoc(@Param('id') id: string) {
      return this.resourceService.findOneDoc(+id);
    }

    @Patch(':id')
    updateDoc(@Param('id') id: string, @Body() updateDocDto: UpdateDocDto) {
      return this.resourceService.updateDoc(+id, updateDocDto);
    }

    @Delete(':id')
    removeDoc(@Param('id') id: string) {
      return this.resourceService.removeDoc(+id);
    }
}

import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { ResourceService } from './resource.service';
// import { CreateDocDto } from './dto/create-doc.dto';
// import { UpdateDocDto } from './dto/update-doc.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  // @Post()
  // createDoc(@Body() createDocDto: CreateDocDto) {
  //   return this.resourceService.createDoc(createDocDto);
  // }

  @Get()
  @ApiOperation({ summary: '문서 목록 조회', description: '사용자의 ' })
  @UseGuards(AuthGuard)
  findAllUserDoc() {
    return this.resourceService.findAllDoc();
  }

  @Get(':id')
  findOneDoc(@Param('id') id: string) {
    return this.resourceService.findOneDoc(+id);
  }

  // @Patch(':id')
  // updateDoc(@Param('id') id: string, @Body() updateDocDto: UpdateDocDto) {
  //   return this.resourceService.updateDoc(+id, updateDocDto);
  // }

  @Delete(':id')
  removeDoc(@Param('id') id: string) {
    return this.resourceService.removeDoc(+id);
  }
}

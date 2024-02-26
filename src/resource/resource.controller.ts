import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Post,
  Body,
  Patch,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
import { GetAccount } from 'src/auth/decorator/get-account.decorator';
import { ProfileAccount } from 'src/auth/interface/profileAccount.interface';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('resource')
@UseGuards(JwtAuthGuard)
@ApiTags('Resource API Endpoints')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post('/doc')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'attachments', maxCount: 10 }]),
  )
  @ApiOperation({
    summary: '문서 생성',
    description: '제목과 내용, 파일(들)을 첨부할 수 있는 문서 생성',
  })
  async createDoc(
    @GetAccount() profileAccount: ProfileAccount,
    @Body() dto: CreateDocDto,
    @UploadedFiles() files: { attachments: Express.Multer.File[] },
  ) {
    console.log(profileAccount);
    console.log(dto);
    console.log(files.attachments);
    const doc = await this.resourceService.createDoc(
      dto,
      profileAccount.profile,
    );
    console.log(doc);
    const uploadFiles = await this.resourceService.uploadFiles(
      files.attachments,
      profileAccount.profile,
    );
    console.log(uploadFiles);
    return null;
  }

  @Get('/doc/:id')
  // TODO: 문서별 권한 관리 기능 추가 기획 필요
  @ApiOperation({
    summary: '문서 조회',
    description: '해당 ID의 문서 조회',
  })
  findOneDoc(@Param('id') id: string) {
    return this.resourceService.findOneDoc(+id);
  }

  @Patch('/doc/:id')
  @ApiOperation({ summary: '문서 수정', description: '해당 ID의 문서 수정' })
  updateDoc(@Param('id') id: string, @Body() updateDocDto: UpdateDocDto) {
    return this.resourceService.updateDoc(+id, updateDocDto);
  }

  @Get('/doc')
  @ApiOperation({
    summary: '문서 목록 조회',
    description: '사용자가 작성한 모든 문서 목록을 조회한다. ',
  })
  findAllUserDoc() {
    return this.resourceService.findAllDoc();
  }

  @Delete(':id')
  removeDoc(@Param('id') id: string) {
    return this.resourceService.removeDoc(+id);
  }
}

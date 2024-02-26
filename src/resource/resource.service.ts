import { Injectable } from '@nestjs/common';
// import { CreateDocDto } from './dto/create-doc.dto';
// import { UpdateDocDto } from './dto/update-doc.dto';
import { DocRepository } from './repository/doc.repository';
import { FileRepository } from './repository/file.repository';
import { CreateDocDto } from './dto/create-doc.dto';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
import { Doc } from './entity/doc.entity';
import { Profile } from 'src/user/enitity/profile.entity';
import { File } from './entity/file.entity';

@Injectable()
export class ResourceService {
  constructor(
    private readonly docRepository: DocRepository,
    private readonly fileRepository: FileRepository,
  ) {}

  async uploadImage(
    image: Express.Multer.File,
    profile?: Profile,
  ): Promise<File> {
    const uploadFile = new CreateFileDto(image, process.env.IMG_DIR, profile);
    const result = this.fileRepository.save(uploadFile);
    return result;
  }

  async uploadFile(file: Express.Multer.File, profile: Profile): Promise<File> {
    const uploadFile = new CreateFileDto(file, process.env.FILE_DIR, profile);
    const result = this.fileRepository.save(uploadFile);
    return result;
  }

  async uploadFiles(
    files: Express.Multer.File[],
    profile: Profile,
  ): Promise<File[]> {
    const uploadFiles = files.map(async (file) => {
      return await this.uploadFile(file, profile);
    });
    return Promise.all(uploadFiles);
  }

  createDoc(dto: CreateDocDto, profile: Profile) {
    const doc = this.docRepository.create({ ...dto, profile });
    return this.docRepository.save(doc);
  }

  findAllDoc() {
    return `This action returns all documents`;
  }

  findOneDoc(id: number): Promise<Doc> {
    return this.docRepository.findOneByOrFail({ id });
  }

  async updateDoc(id: number, updateDocDto: UpdateDocDto) {
    const doc = await this.docRepository.findOneByOrFail({ id });
    return this.docRepository.save({ ...doc, ...updateDocDto });
  }

  removeDoc(id: number) {
    return `This action removes a #${id} document`;
  }
}

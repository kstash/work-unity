import { Injectable } from '@nestjs/common';
// import { CreateDocDto } from './dto/create-doc.dto';
// import { UpdateDocDto } from './dto/update-doc.dto';
import { DocRepository } from './repository/doc.repository';
import { FileRepository } from './repository/file.repository';

@Injectable()
export class ResourceService {
  constructor(
    private readonly docRepository: DocRepository,
    private readonly fileRepository: FileRepository,
  ) {}

  // createDoc(createDocDto: CreateDocDto) {
  //   return 'This action adds a new document';
  // }

  findAllDoc() {
    return `This action returns all documents`;
  }

  findOneDoc(id: number) {
    return `This action returns a #${id} document`;
  }

  // updateDoc(id: number, updateDocDto: UpdateDocDto) {
  //   return `This action updates a #${id} document`;
  // }

  removeDoc(id: number) {
    return `This action removes a #${id} document`;
  }
}

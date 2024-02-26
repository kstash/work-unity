import { extname } from 'path';
import { Profile } from 'src/user/enitity/profile.entity';

export class CreateFileDto {
  ext?: string;
  name!: string;
  originalname!: string;
  path!: string;
  size!: number;
  profile?: Profile;

  /**
   * CreateFileDto 생성자 파라미터 값
   * @param file 파일 객체
   * @param dir 저장될 파일의 상위경로로 지정된 환경 변수를 사용
   * @param profile 프로필 객체
   */
  constructor(file: Express.Multer.File, dir: string, profile?: Profile) {
    this.ext = extname(file.originalname);
    this.name = file.filename;
    this.originalname = file.originalname;
    this.path = dir + '/' + this.name;
    this.size = file.size;
    this.profile = profile;
  }
}

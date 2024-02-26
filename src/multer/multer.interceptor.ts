import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as multer from 'multer';
import { RequestHandler } from '@nestjs/common/interfaces';

@Injectable()
export class ImageUploadInterceptor implements NestInterceptor {
  private upload: RequestHandler;

  constructor() {
    this.upload = multer({
      storage: diskStorage({
        destination: process.env.IMG_DIR,
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const filename = Date.now() + ext;
          cb(null, filename);
        },
      }),
    }).single('image');
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    return new Observable((observer) => {
      this.upload(req, res, (err: any) => {
        if (err) {
          observer.error(err);
        } else {
          next.handle().subscribe(observer);
        }
      });
    });
  }
}

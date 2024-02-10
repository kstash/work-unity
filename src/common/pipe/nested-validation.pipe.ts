import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

/**
 *  ValidateNested decorator를 사용하여 request parameter를 validate할 때 사용하는 Pipe
 *
 *  validate 하는 Object parameter 내부 attribute 중 복수개 이상의 validation error가 발생해도,
 *  각 Object 별 하나의 validation message를 반환한다.
 **/
@Injectable()
export class NestedValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (!value) {
      throw new BadRequestException('No data parameter was submitted');
    }
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(this.formatErrors(errors));
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: ValidationError[]) {
    return errors.map(
      (error) =>
        error.property +
        '.' +
        Object.values(error.children[0].constraints).pop(),
    );
  }
}

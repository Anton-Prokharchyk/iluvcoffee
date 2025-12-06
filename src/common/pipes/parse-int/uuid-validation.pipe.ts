import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const isVaildUuid = new RegExp(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    const isValid = isVaildUuid.test(value);
    if (!isValid) {
      throw new BadRequestException('Invalid UUID format');
    }
    return value;
  }
}

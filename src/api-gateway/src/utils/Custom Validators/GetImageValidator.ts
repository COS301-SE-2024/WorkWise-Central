import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';

export function GetImageValidator(): PipeTransform {
  return new ParseFilePipeDocument();
}

@Injectable()
export class ParseFilePipeDocument implements PipeTransform {
  private readonly allowedExtensions = ['.png', '.gif', '.jpeg', '.jpg', 'webp', 'bmp'];

  transform(value: Express.Multer.File): Express.Multer.File {
    const extension = extname(value.originalname);
    if (!this.allowedExtensions.includes(extension)) {
      throw new BadRequestException(`File type ${extension} not supported`);
    }
    return value;
  }
}

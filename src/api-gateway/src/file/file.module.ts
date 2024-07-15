import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  controllers: [FileController],
  providers: [CloudinaryProvider, FileService],
  exports: [CloudinaryProvider, FileService],
})
export class FileModule {}

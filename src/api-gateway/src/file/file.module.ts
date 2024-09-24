import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { CloudinaryProvider } from './cloudinary.provider';
import { ConfigService } from '@nestjs/config';
import { GlobalModuleModule } from '../shared/global-module/global-module.module';

@Module({
  imports: [GlobalModuleModule],
  controllers: [FileController],
  providers: [CloudinaryProvider, FileService, ConfigService],
  exports: [CloudinaryProvider, FileService, GlobalModuleModule],
})
export class FileModule {}

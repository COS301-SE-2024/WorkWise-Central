import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from '../file.controller';
import { FileService } from '../file.service';
import { GlobalModuleModule } from '../../shared/global-module/global-module.module';
import { ConfigService } from '@nestjs/config';

describe('FileController', () => {
  let controller: FileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModuleModule],
      controllers: [FileController],
      providers: [FileService, ConfigService],
    }).compile();

    controller = module.get<FileController>(FileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

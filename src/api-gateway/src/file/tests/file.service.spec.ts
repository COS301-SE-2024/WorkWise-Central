import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '../file.service';
import { ConfigService } from '@nestjs/config';

describe('FileService', () => {
  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: 'GLOBAL_CONFIG',
          useValue: 'http://mocked-server-url.com', // Mocked URL
        },
        ConfigService,
      ],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

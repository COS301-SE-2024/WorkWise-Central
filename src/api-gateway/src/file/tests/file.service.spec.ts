import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '../file.service';

describe('FileService', () => {
  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: 'GLOBAL_SERVER_URL',
          useValue: 'http://mocked-server-url.com', // Mocked URL
        },
      ],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

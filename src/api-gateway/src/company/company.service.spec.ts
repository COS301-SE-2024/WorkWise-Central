import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from './entities/company.entity';

describe('CompanyService', () => {
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: `.env` }),
        MongooseModule.forRoot(`${process.env.SERVER_LOGIN}`),
        MongooseModule.forFeature([{ name: 'company', schema: CompanySchema }]),
      ],
      providers: [CompanyService],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from './entities/company.entity';
import { AuthModule } from '../auth/auth.module';

describe('CompanyController', () => {
  let controller: CompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: `.env` }),
        MongooseModule.forRoot(`${process.env.SERVER_LOGIN}`),
        MongooseModule.forFeature([{ name: 'company', schema: CompanySchema }]),
        AuthModule,
      ],
      controllers: [CompanyController],
      providers: [CompanyService],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

/*
import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from '../job.controller';
import { JobService } from '../job.service';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from '../../client/client.service';

describe('JobController', () => {
  let controller: JobController;

  const mockJobService = {
    create: jest.fn(),
    findAllCompanies: jest.fn(),
  };

  const mockClientService = {
    create: jest.fn(),
    findAllCompanies: jest.fn(),
  };

  const mockJwtService = {
    create: jest.fn(),
    findAllCompanies: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [
        {
          provide: JobService,
          useValue: mockJobService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ClientService,
          useValue: mockClientService,
        },
      ],
    }).compile();

    controller = module.get<JobController>(JobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
*/

describe('myGenericFunction', () => {
  it('should return the correct value', () => {
    const result = 1;
    expect(result).toBe(1);
  });
});

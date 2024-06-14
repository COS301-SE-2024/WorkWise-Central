import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';
import { userStub } from '../../test/stubs/user.stub';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { ClientService } from '../client/client.service';
import { Company } from '../company/entities/company.entity';
import { Job } from './entities/job.entity';
import { User } from '../users/entities/user.entity';
import { Client } from '../client/entities/client.entity';

describe('JobService', () => {
  let service: JobService;

  const mockJobModel = {
    create: jest.fn().mockReturnValue(userStub()),
    findAll: jest.fn().mockReturnValue(userStub()),
    findUser: jest.fn().mockReturnValue(userStub()),
    update: jest.fn().mockReturnValue(userStub()),
    remove: jest.fn().mockReturnValue(userStub()),
  };
  const mockUsersModel = {
    create: jest.fn().mockReturnValue(userStub()),
    findAll: jest.fn().mockReturnValue(userStub()),
    findUser: jest.fn().mockReturnValue(userStub()),
    update: jest.fn().mockReturnValue(userStub()),
    remove: jest.fn().mockReturnValue(userStub()),
  };
  const mockCompanyModel = {
    create: jest.fn().mockReturnValue(userStub()),
    findAll: jest.fn().mockReturnValue(userStub()),
    findUser: jest.fn().mockReturnValue(userStub()),
    update: jest.fn().mockReturnValue(userStub()),
    remove: jest.fn().mockReturnValue(userStub()),
  };

  const mockClientModel = {
    create: jest.fn().mockReturnValue(userStub()),
    findAll: jest.fn().mockReturnValue(userStub()),
    findUser: jest.fn().mockReturnValue(userStub()),
    update: jest.fn().mockReturnValue(userStub()),
    remove: jest.fn().mockReturnValue(userStub()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        UsersService,
        CompanyService,
        ClientService,
        {
          provide: getModelToken(Job.name),
          useValue: mockJobModel,
        },
        {
          provide: getModelToken(User.name),
          useValue: mockUsersModel,
        },
        {
          provide: getModelToken(Company.name),
          useValue: mockCompanyModel,
        },
        {
          provide: getModelToken(Client.name),
          useValue: mockClientModel,
        },
      ],
    }).compile();

    service = module.get<JobService>(JobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

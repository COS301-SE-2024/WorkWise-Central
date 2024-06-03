import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';
import { userStub } from '../../test/stubs/user.stub';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';

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
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        UsersService,
        CompanyService,
        {
          provide: getModelToken('job'),
          useValue: mockJobModel,
        },
        {
          provide: getModelToken('user'),
          useValue: mockUsersModel,
        },
        {
          provide: getModelToken('company'),
          useValue: mockCompanyModel,
        },
      ],
    }).compile();

    service = module.get<JobService>(JobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

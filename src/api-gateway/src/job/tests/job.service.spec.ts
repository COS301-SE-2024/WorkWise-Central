import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from '../job.service';
import { userStub } from '../../../test/stubs/user.stub';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../../users/users.service';
import { CompanyService } from '../../company/company.service';
import { ClientService } from '../../client/client.service';
import { Company } from '../../company/entities/company.entity';
import { Job } from '../entities/job.entity';
import { User } from '../../users/entities/user.entity';
import { Client } from '../../client/entities/client.entity';
import { JobRepository } from '../job.repository';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

class MockJobModel {
  constructor(private data: any) {}
  create = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn().mockResolvedValue(['event']);
  static watch = jest.fn().mockResolvedValue(['event']);
  static findOne = jest.fn().mockResolvedValue('event');
  static findOneAndUpdate = jest.fn().mockResolvedValue('event');
  static deleteOne = jest.fn().mockResolvedValue(true);
}

describe('JobService', () => {
  let service: JobService;

  const mockJobModel = {
    create: jest.fn().mockReturnValue(userStub()),
    findAllCompanies: jest.fn().mockReturnValue(userStub()),
    findUser: jest.fn().mockReturnValue(userStub()),
    update: jest.fn().mockReturnValue(userStub()),
    remove: jest.fn().mockReturnValue(userStub()),
  };
  const mockUsersModel = {
    create: jest.fn().mockReturnValue(userStub()),
    findAllCompanies: jest.fn().mockReturnValue(userStub()),
    findUser: jest.fn().mockReturnValue(userStub()),
    update: jest.fn().mockReturnValue(userStub()),
    remove: jest.fn().mockReturnValue(userStub()),
  };
  const mockCompanyModel = {
    create: jest.fn().mockReturnValue(userStub()),
    findAllCompanies: jest.fn().mockReturnValue(userStub()),
    findUser: jest.fn().mockReturnValue(userStub()),
    update: jest.fn().mockReturnValue(userStub()),
    remove: jest.fn().mockReturnValue(userStub()),
  };

  const mockClientModel = {
    create: jest.fn().mockReturnValue(userStub()),
    findAllCompanies: jest.fn().mockReturnValue(userStub()),
    findUser: jest.fn().mockReturnValue(userStub()),
    update: jest.fn().mockReturnValue(userStub()),
    remove: jest.fn().mockReturnValue(userStub()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        { provide: CompanyService, useClass: MockJobModel },
        { provide: ClientService, useClass: MockJobModel },
        { provide: JobRepository, useClass: MockJobModel },
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
    })
      .useMocker((token) => {
        if (token === UsersService) {
          return {
            create: jest.fn().mockReturnValue(userStub()),
            findAllUsers: jest.fn().mockReturnValue(userStub()),
            findUser: jest.fn().mockReturnValue(userStub()),
            update: jest.fn().mockReturnValue(userStub()),
            remove: jest.fn().mockReturnValue(userStub()),
          };
        }
        if (token === CompanyService) {
          return {
            create: jest.fn().mockReturnValue(userStub()),
            findAllUsers: jest.fn().mockReturnValue(userStub()),
            findUser: jest.fn().mockReturnValue(userStub()),
            update: jest.fn().mockReturnValue(userStub()),
            remove: jest.fn().mockReturnValue(userStub()),
          };
        }
        if (token === ClientService) {
          return {
            create: jest.fn().mockReturnValue(userStub()),
            findAllUsers: jest.fn().mockReturnValue(userStub()),
            findUser: jest.fn().mockReturnValue(userStub()),
            update: jest.fn().mockReturnValue(userStub()),
            remove: jest.fn().mockReturnValue(userStub()),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    service = module.get<JobService>(JobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

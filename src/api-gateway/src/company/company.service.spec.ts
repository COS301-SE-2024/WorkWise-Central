import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { UsersService } from '../users/users.service';
import { userStub } from '../../test/stubs/user.stub';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { CompanyController } from './company.controller';

const moduleMocker = new ModuleMocker(global);

describe('CompanyService', () => {
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
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
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

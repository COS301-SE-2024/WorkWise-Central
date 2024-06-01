import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { UsersService } from '../users/users.service';
import { userStub } from '../../test/stubs/user.stub';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
const moduleMocker = new ModuleMocker(global);

describe('CompanyController', () => {
  let controller: CompanyController;

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

    controller = module.get<CompanyController>(CompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

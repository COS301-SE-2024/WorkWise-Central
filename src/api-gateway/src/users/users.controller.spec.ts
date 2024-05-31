import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { mockUserObject, userStub } from '../../test/stubs/user.stub';

const moduleMocker = new ModuleMocker(global);

describe('UsersController', () => {
  let usersController: UsersController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
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

    usersController = module.get(UsersController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should not create a user when null is input', async function () {
    const result = await usersController.create(null);
    //console.log(result);
    expect(result).toStrictEqual(mockUserObject);
  });

  it('should find all users', function () {
    expect(usersController.findAll()).toBeDefined();
  });
});

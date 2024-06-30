import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { mockUserObject, userStub } from '../../../test/stubs/user.stub';
import { Types } from 'mongoose';
import { UserApiObject } from '../entities/user.entity';

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
            getAllUsers: jest.fn().mockReturnValue([userStub(), userStub()]),
            findUser: jest.fn().mockReturnValue(userStub()),
            update: jest.fn().mockReturnValue(userStub()),
            softDelete: jest.fn().mockReturnValue([]),
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

    usersController = module.get<UsersController>(UsersController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should not create a user when null is input', async function () {
    const result = await usersController.create(null);
    const temp1 = new UserApiObject();
    console.log(temp1);
    const temp2 = new UserApiObject();
    console.log(temp2);
    const temp3 = new UserApiObject();
    console.log(temp3);
    //console.log(result);
    expect(result).toStrictEqual(mockUserObject);
  });

  it('should find all users', async function () {
    const allUsers = await usersController.findAll();
    expect(allUsers.response.length).toBe(2);
  });

  it('should remove users', function () {
    expect(
      usersController.remove(new Types.ObjectId().toString()),
    ).toStrictEqual([]);
  });

  it('should Point you to the docs', function () {
    expect(usersController.lookAtDocumentation()).toStrictEqual({
      message: 'Refer to /documentation for details on the API',
    });
  });

  it('should verify that objectIds are legit', function () {
    //expect(usersController.validateObjectId('a')).toThrow('Invalid ID');
    expect(usersController.validateObjectId(new Types.ObjectId())).toBe(true);
  });
});

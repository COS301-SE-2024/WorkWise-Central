import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { userStub } from '../../test/stubs/user.stub';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    })
      .useMocker(() => {
        return {
          create: jest.fn().mockReturnValue(userStub()),
          findAllUsers: jest.fn().mockReturnValue(userStub()),
          findUser: jest.fn().mockReturnValue(userStub()),
          update: jest.fn().mockReturnValue(userStub()),
          remove: jest.fn().mockReturnValue(userStub()),
          softDelete: jest.fn().mockReturnValue('User not found'),
        };
      })
      .compile();

    service = module.get(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a user', function () {
    expect(service.create(userStub())).toBeDefined();
  });

  it('should be able to remove a user', async function () {
    //await expect(await service.softDelete('')).rejects.toThrow("Error: User not found");
  });
});

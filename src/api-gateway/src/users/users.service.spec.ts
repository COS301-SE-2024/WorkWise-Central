import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { userStub } from '../../test/stubs/user.stub';
import { getModelToken } from '@nestjs/mongoose';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { User } from './entities/user.entity';
const moduleMocker = new ModuleMocker(global);

describe('UsersService', () => {
  let service: UsersService;
  beforeEach(async () => {
    function mockUserModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useValue: mockUserModel },
      ],
    })
      .useMocker(() => {
        return {
          create: jest.fn().mockReturnValue(userStub()),
          findAllUsers: jest.fn().mockReturnValue(userStub()),
          findUser: jest.fn().mockReturnValue(userStub()),
          update: jest.fn().mockReturnValue(userStub()),
          remove: jest.fn().mockReturnValue([]),
          softDelete: jest.fn().mockReturnValue('User not found'),
        };
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
    service = module.get(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a user', function () {
    //expect(service.create(userStub())).toBeDefined();
  });

  it('should be able to remove a user', async function () {
    //const result = await service.create();
    //console.log(result);
    //await expect(await service.softDelete('')).toThrow(NotFoundException);
  });
});

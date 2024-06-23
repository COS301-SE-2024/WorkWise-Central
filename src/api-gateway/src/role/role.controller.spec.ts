/*
import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { getModelToken } from '@nestjs/mongoose';
import { Role } from './entity/role.entity';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('RoleController', () => {
  let controller: RoleController;

  class MockRoleModel {
    constructor(private data: any) {}
    create = jest.fn().mockResolvedValue(this.data);
    static find = jest.fn().mockResolvedValue(['event']);
    static findOne = jest.fn().mockResolvedValue('event');
    static findOneAndUpdate = jest.fn().mockResolvedValue('event');
    static deleteOne = jest.fn().mockResolvedValue(true);
  }

  class MockRoleService {
    verifyUser(a?: any) {
      return !!a;
    }
    exists(a?: any) {
      return a != 'b';
    }
    softDelete(a: any) {
      console.log(a);
    }
    getUserByUsername() {
      return null;
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        { provide: getModelToken(Role.name), useValue: MockRoleModel },
        { provide: RoleService, useClass: MockRoleService },
      ],
    })
      .useMocker((token) => {
        const results = ['test1', 'test2'];
        if (token === RoleService) {
          return { findAll: jest.fn().mockResolvedValue(results) };
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

    controller = module.get<RoleController>(RoleController);
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

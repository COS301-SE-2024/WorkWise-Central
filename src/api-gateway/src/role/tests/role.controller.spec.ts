import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from '../role.controller';
import { RoleService } from '../role.service';
import { Types } from 'mongoose';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
// import { HttpException, HttpStatus } from '@nestjs/common';

jest.mock('../role.service');
const moduleMocker = new ModuleMocker(global);

describe('--Role Controller--', () => {
  let controller: RoleController;
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [RoleService],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<RoleController>(RoleController);
    service = module.get<RoleService>(RoleService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('hello', () => {
    it('should return message', () => {
      expect(controller.hello()).toEqual({
        message: 'Refer to /documentation for details on the API',
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      const returnedResponseFromService = [
        {
          _id: new Types.ObjectId(),
          roleName: 'Role Name',
          permissionSuite: ['permission1', 'permission2'],
          companyId: new Types.ObjectId(),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      const expectedResponse = {
        data: returnedResponseFromService,
      };
      jest.spyOn(service, 'findAll').mockResolvedValue(returnedResponseFromService as any);
      expect(await controller.findAll()).toEqual(expectedResponse);
    });
  });

  describe('findAllInCompany', () => {
    it('should return an array of roles', async () => {
      const companyId = new Types.ObjectId();
      const returnedResponseFromService = [
        {
          _id: new Types.ObjectId(),
          roleName: 'Role Name',
          permissionSuite: ['permission1', 'permission2'],
          companyId: new Types.ObjectId(),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      const expectedResponse = {
        data: returnedResponseFromService,
      };
      jest.spyOn(service, 'findAllInCompany').mockResolvedValue(returnedResponseFromService as any);
      expect(await controller.findAllInCompany(companyId)).toEqual(expectedResponse);
    });
  });

  describe('findById', () => {
    it('should return an object with data property', async () => {
      const returnedResponseFromService = {
        _id: new Types.ObjectId(),
        roleName: 'Role Name',
        permissionSuite: ['permission1', 'permission2'],
        companyId: new Types.ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      const expectedResponse = {
        data: returnedResponseFromService,
      };
      jest.spyOn(service, 'findById').mockResolvedValue(returnedResponseFromService);
      expect(await controller.findById(new Types.ObjectId())).toEqual(expectedResponse);
    });
  });

  describe('getPermissionsArray', () => {
    it('should return an array of strings', async () => {
      const returnedResponseFromService = ['permission1', 'permission2', 'permission3'];
      const expectedResponse = {
        data: returnedResponseFromService,
      };
      jest.spyOn(service, 'getPermissionsArray').mockResolvedValue(returnedResponseFromService as never);
      expect(await controller.getPermissionsArray()).toEqual(expectedResponse);
    });
  });

  describe('create', () => {
    it('should return an object with data property', async () => {
      const createRoleDto = {
        roleName: 'Role Name',
        permissionSuite: ['permission1', 'permission2'],
        companyId: new Types.ObjectId(),
      };
      const returnedResponseFromService = {
        _id: new Types.ObjectId(),
        roleName: 'Role Name',
        permissionSuite: ['permission1', 'permission2'],
        companyId: new Types.ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      const expectedResponse = {
        data: returnedResponseFromService,
      };
      jest.spyOn(service, 'create').mockResolvedValue(returnedResponseFromService as any);
      const body = { currentEmployeeId: new Types.ObjectId(), createRoleDto: createRoleDto };
      expect(await controller.create('header', body)).toEqual(expectedResponse);
    });
  });

  describe('update', () => {
    it('should return an object with data property', async () => {
      const roleId = new Types.ObjectId();
      const updateRoleDto = {
        roleName: 'Role Name',
        permissionSuite: ['permission1', 'permission2'],
      };
      const returnedResponseFromService = {
        _id: new Types.ObjectId(),
        roleName: 'Role Name',
        permissionSuite: ['permission1', 'permission2'],
        companyId: new Types.ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      const expectedResponse = {
        data: returnedResponseFromService,
      };
      jest.spyOn(service, 'update').mockResolvedValue(returnedResponseFromService);
      const body = { currentEmployeeId: new Types.ObjectId(), updateRoleDto: updateRoleDto };
      expect(await controller.update('header', roleId, body)).toEqual(expectedResponse);
    });
  });

  describe('remove', () => {
    it('should return true if role is deleted', async () => {
      const returnedResponseFromService = true;
      const expectedResponse = {
        data: returnedResponseFromService,
      };
      jest.spyOn(service, 'remove').mockResolvedValue(returnedResponseFromService);
      const currentEmployee = { currentEmployeeId: new Types.ObjectId() };
      expect(await controller.remove('header', new Types.ObjectId(), currentEmployee)).toEqual(expectedResponse);
    });
    // it('should return false if role is not deleted', async () => {
    //   const returnedResponseFromService = false;
    //   jest
    //     .spyOn(service, 'remove')
    //     .mockResolvedValue(returnedResponseFromService);
    //   expect(await controller.remove(new Types.ObjectId())).toEqual(
    //     new HttpException(
    //       'update unsuccessful',
    //       HttpStatus.INTERNAL_SERVER_ERROR,
    //     ),
    //   );
    // });
  });
});

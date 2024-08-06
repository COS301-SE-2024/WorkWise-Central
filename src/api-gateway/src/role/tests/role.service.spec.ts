import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { RoleService } from '../role.service';
import { RoleRepository } from '../role.repository';
import { CompanyService } from '../../company/company.service';
import { Role } from '../entity/role.entity';
import { EmployeeService } from '../../employee/employee.service';

const mockRoleRepository = {
  findAll: jest.fn(),
  save: jest.fn(),
  findAllInCompany: jest.fn(),
  findById: jest.fn(),
  findByIdInCompany: jest.fn(),
  update: jest.fn(),
  roleExists: jest.fn(),
  roleExistsInCompany: jest.fn(),
  remove: jest.fn(),
};

const mockCompanyService = {
  companyIdExists: jest.fn(),
};

const mockEmployeeService = {};

describe('--Role Service--', () => {
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        { provide: getModelToken(Role.name), useValue: {} },
        { provide: RoleRepository, useValue: mockRoleRepository },
        { provide: CompanyService, useValue: mockCompanyService },
        { provide: EmployeeService, useValue: mockEmployeeService },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    //TODO
  });

  describe('findAll', () => {
    it('should return all roles', async () => {
      const roles = [
        {
          roleName: 'Admin',
          permissionSuite: ['permission 1', 'permission 2', 'permission 3'],
          companyId: new Types.ObjectId(),
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
        {
          roleName: 'User',
          permissionSuite: ['permission 1', 'permission 2', 'permission 3'],
          companyId: new Types.ObjectId(),
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
      ];
      mockRoleRepository.findAll.mockResolvedValue(roles);
      const result = await service.findAll();
      expect(result).toEqual(roles);
    });
  });

  describe('getPermissionsArray', () => {
    it('should return an array of permissions', async () => {
      const permissions = [
        'view all employees',
        'view employees under me',
        'edit all employees',
        'edit employees under me',
        'add new employees',
        'view all jobs',
        'view all jobs under me',
        'view all jobs assigned to me',
        'edit all jobs',
        'edit jobs that are under me',
        'edit jobs that are assigned to me',
        'add a new job',
        'view all clients',
        'view all clients under me',
        'view all clients that are assigned to me',
        'edit all clients',
        'edit all clients that are under me',
        'edit all clients that are assigned to me',
        'view all inventory',
        'edit all inventory',
        'add a new inventory item',
        'record inventory use',
      ];
      const result = await service.getPermissionsArray();
      expect(result).toEqual(permissions);
    });
  });

  describe('findAllInCompany', () => {
    it('should return all roles in a company', async () => {
      const companId = new Types.ObjectId();
      const roles = [
        {
          roleName: 'Admin',
          permissionSuite: ['permission 1', 'permission 2', 'permission 3'],
          companyId: new Types.ObjectId(),
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
        {
          roleName: 'User',
          permissionSuite: ['permission 1', 'permission 2', 'permission 3'],
          companyId: new Types.ObjectId(),
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
      ];
      mockCompanyService.companyIdExists.mockResolvedValue(true);
      mockRoleRepository.findAllInCompany.mockResolvedValue(roles);
      const result = await service.findAllInCompany(companId);
      expect(result).toEqual(roles);
    });
  });

  describe('findOneInCompany', () => {
    it('should return a role in a company', async () => {
      const companyId = new Types.ObjectId();
      const role = {
        roleName: 'Admin',
        permissionSuite: ['permission 1', 'permission 2', 'permission 3'],
        companyId: new Types.ObjectId(),
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      };
      mockCompanyService.companyIdExists.mockResolvedValue(true);
      mockRoleRepository.findByIdInCompany.mockResolvedValue(role);
      const result = await service.findOneInCompany(role.roleName, companyId);
      expect(result).toEqual(role);
    });
  });

  describe('findById', () => {
    it('should return a role by id', async () => {
      const id = new Types.ObjectId();
      const role = {
        roleName: 'Admin',
        companyId: new Types.ObjectId(),
      };
      mockRoleRepository.findById.mockResolvedValue(role);
      const result = await service.findById(id);
      expect(result).toEqual(role);
    });
  });

  describe('update', () => {
    // TODO
  });

  describe('roleExists', () => {
    it('should return true if role exists', async () => {
      const id = new Types.ObjectId();
      mockRoleRepository.roleExists.mockResolvedValue(true);
      const result = await service.roleExists(id);
      expect(result).toBe(true);
    });
    it('should return false if role does not exist', async () => {
      const id = new Types.ObjectId();
      mockRoleRepository.roleExists.mockResolvedValue(false);
      const result = await service.roleExists(id);
      expect(result).toBe(false);
    });
  });

  describe('roleExistsInCompany', () => {
    it('should return true if role exists in a company', async () => {
      const id = new Types.ObjectId();
      const companyId = new Types.ObjectId();
      mockCompanyService.companyIdExists.mockResolvedValue(true);
      mockRoleRepository.roleExistsInCompany.mockResolvedValue(true);
      const result = await service.roleExistsInCompany(id, companyId);
      expect(result).toBe(true);
    });
    it('should return false if role does not exist', async () => {
      const id = new Types.ObjectId();
      const companyId = new Types.ObjectId();
      mockCompanyService.companyIdExists.mockResolvedValue(true);
      mockRoleRepository.roleExistsInCompany.mockResolvedValue(false);
      const result = await service.roleExistsInCompany(id, companyId);
      expect(result).toBe(false);
    });
  });

  describe('remove', () => {
    it('should return true if role is removed', async () => {
      const id = new Types.ObjectId();
      jest.spyOn(service, 'roleExists').mockResolvedValue(true);
      mockRoleRepository.remove.mockResolvedValue(true);
      const result = await service.remove(id);
      expect(result).toBe(true);
    });
    it('should return false if role is not removed', async () => {
      const id = new Types.ObjectId();
      jest.spyOn(service, 'roleExists').mockResolvedValue(true);
      mockRoleRepository.remove.mockResolvedValue(false);
      const result = await service.remove(id);
      expect(result).toBe(false);
    });
  });
});

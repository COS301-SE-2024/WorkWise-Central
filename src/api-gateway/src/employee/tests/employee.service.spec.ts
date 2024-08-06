import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { EmployeeService } from '../employee.service';
import { EmployeeRepository } from '../employee.repository';
import { UsersService } from '../../users/users.service';
import { CompanyService } from '../../company/company.service';
import { RoleService } from '../../role/role.service';
import { JobService } from '../../job/job.service';
import { TeamService } from '../../team/team.service';
import { Employee } from '../entities/employee.entity';

const mockEmployeeRepository = {
  findAll: jest.fn(),
  findAllInCompany: jest.fn(),
  findById: jest.fn(),
  findByIds: jest.fn(),
  employeeExists: jest.fn(),
  employeeExistsForCompany: jest.fn(),
  getCompanyIdFromEmployee: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const mockUsersService = {
  userIdExists: jest.fn(),
  getUserById: jest.fn(),
  userIsInCompany: jest.fn(),
};

const mockCompanyService = {
  companyIdExists: jest.fn(),
};

const mockRoleService = {
  roleExistsInCompany: jest.fn(),
};

const mockJobService = {
  jobExistsInCompany: jest.fn(),
};

const mockTeamService = {
  teamExistsInCompany: jest.fn(),
};

describe('--Employee Service--', () => {
  let employeeService: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        { provide: getModelToken(Employee.name), useValue: {} },
        { provide: EmployeeRepository, useValue: mockEmployeeRepository },
        { provide: UsersService, useValue: mockUsersService },
        { provide: CompanyService, useValue: mockCompanyService },
        { provide: RoleService, useValue: mockRoleService },
        { provide: JobService, useValue: mockJobService },
        { provide: TeamService, useValue: mockTeamService },
      ],
    }).compile();

    employeeService = module.get<EmployeeService>(EmployeeService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(employeeService).toBeDefined();
  });

  describe('create', () => {
    // TODO
  });

  describe('findAll', () => {
    it('should return all employees', async () => {
      const expectedResponse = [
        {
          _id: new Types.ObjectId(),
          roleId: new Types.ObjectId(),
          currentJobAssignments: [new Types.ObjectId()],
          superiorId: new Types.ObjectId(),
          subordinates: [new Types.ObjectId()],
          subordinateTeams: [new Types.ObjectId()],
          userId: new Types.ObjectId(),
          companyId: new Types.ObjectId(),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      mockEmployeeRepository.findAll.mockResolvedValue(expectedResponse);

      expect(await employeeService.findAll()).toEqual(expectedResponse);
    });
  });

  describe('findAllInCompany', () => {
    it('should return all employees in a given company', async () => {
      const companyId = new Types.ObjectId();
      const expectedResponse = [
        {
          _id: new Types.ObjectId(),
          roleId: new Types.ObjectId(),
          currentJobAssignments: [new Types.ObjectId()],
          superiorId: new Types.ObjectId(),
          subordinates: [new Types.ObjectId()],
          subordinateTeams: [new Types.ObjectId()],
          userId: new Types.ObjectId(),
          companyId: new Types.ObjectId(),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      jest.spyOn(mockCompanyService, 'companyIdExists').mockResolvedValue(true);
      mockEmployeeRepository.findAllInCompany.mockResolvedValue(expectedResponse);

      expect(await employeeService.findAllInCompany(companyId)).toEqual(expectedResponse);
    });
  });

  describe('findById', () => {
    it('should return an employee by id', async () => {
      const id = new Types.ObjectId();
      const expectedResponse = {
        _id: id,
        roleId: new Types.ObjectId(),
        currentJobAssignments: [new Types.ObjectId()],
        superiorId: new Types.ObjectId(),
        subordinates: [new Types.ObjectId()],
        subordinateTeams: [new Types.ObjectId()],
        userId: new Types.ObjectId(),
        companyId: new Types.ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      mockEmployeeRepository.findById.mockResolvedValue(expectedResponse);
      expect(await employeeService.findById(id)).toEqual(expectedResponse);
    });
  });

  describe('employeeExists', () => {
    it('should return true if employee exists', async () => {
      const id = new Types.ObjectId();

      mockEmployeeRepository.employeeExists.mockResolvedValue(true);

      expect(await employeeService.employeeExists(id)).toBe(true);
    });

    it('should return false if employee does not exist', async () => {
      const id = new Types.ObjectId();

      mockEmployeeRepository.employeeExists.mockResolvedValue(false);

      expect(await employeeService.employeeExists(id)).toBe(false);
    });
  });

  describe('employeeExistsForCompany', () => {
    it('should return true if employee exists in a given company', async () => {
      const id = new Types.ObjectId();
      const companyId = new Types.ObjectId();

      jest.spyOn(mockCompanyService, 'companyIdExists').mockResolvedValue(true);
      mockEmployeeRepository.employeeExistsForCompany.mockResolvedValue(true);

      expect(await employeeService.employeeExistsForCompany(id, companyId)).toBe(true);
    });

    it('should return false if employee does not exist in a given company', async () => {
      const id = new Types.ObjectId();
      const companyId = new Types.ObjectId();

      jest.spyOn(mockCompanyService, 'companyIdExists').mockResolvedValue(true);
      mockEmployeeRepository.employeeExistsForCompany.mockResolvedValue(false);

      expect(await employeeService.employeeExistsForCompany(id, companyId)).toBe(false);
    });
  });

  describe('update', () => {
    // TODO
  });

  describe('getCompanyIdFromEmployee', () => {
    it('should return the company Id for a given employee id', async () => {
      const id = new Types.ObjectId();
      const expectedResponse = new Types.ObjectId();

      jest.spyOn(employeeService, 'employeeExists').mockResolvedValue(true);
      mockEmployeeRepository.getCompanyIdFromEmployee.mockResolvedValue(expectedResponse);

      expect(await employeeService.getCompanyIdFromEmployee(id)).toBe(expectedResponse);
    });

    it('should return null if the employee id does not exist', async () => {
      const id = new Types.ObjectId();
      const expectedResponse = null;

      jest.spyOn(employeeService, 'employeeExists').mockResolvedValue(true);
      mockEmployeeRepository.getCompanyIdFromEmployee.mockResolvedValue(expectedResponse);

      expect(await employeeService.getCompanyIdFromEmployee(id)).toBe(expectedResponse);
    });
  });

  describe('remove', () => {
    it('should return true if employee is deleted', async () => {
      const id = new Types.ObjectId();

      jest.spyOn(employeeService, 'employeeExists').mockResolvedValue(true);
      mockEmployeeRepository.remove.mockResolvedValue(true);

      expect(await employeeService.remove(id)).toBe(true);
    });

    it('should return false if employee is not deleted', async () => {
      const id = new Types.ObjectId();

      jest.spyOn(employeeService, 'employeeExists').mockResolvedValue(true);
      mockEmployeeRepository.remove.mockResolvedValue(false);

      expect(await employeeService.remove(id)).toBe(false);
    });
  });

  describe('findByIds', () => {
    it('should return employees by ids', async () => {
      const ids = [new Types.ObjectId()];
      const expectedResponse = [
        {
          _id: new Types.ObjectId(),
          roleId: new Types.ObjectId(),
          currentJobAssignments: [new Types.ObjectId()],
          superiorId: new Types.ObjectId(),
          subordinates: [new Types.ObjectId()],
          subordinateTeams: [new Types.ObjectId()],
          userId: new Types.ObjectId(),
          companyId: new Types.ObjectId(),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      mockEmployeeRepository.findByIds.mockResolvedValue(expectedResponse);

      expect(await employeeService.findByIds(ids)).toEqual(expectedResponse);
    });
  });

  describe('getSuperior', () => {
    // TODO
  });

  describe('getSubordinates', () => {
    // TODO
  });

  describe('getSubordinateTeams', () => {
    // TODO
  });
});

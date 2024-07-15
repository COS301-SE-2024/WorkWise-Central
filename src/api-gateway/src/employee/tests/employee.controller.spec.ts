import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from '../employee.controller';
import { EmployeeService } from '../employee.service';
import { Types } from 'mongoose';

jest.mock('../employee.service');

describe('--Employee Controller--', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
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
    //The all endpoint simply returns what is returned from the service with a {data:} wrapper.
    //Hence we only need 1 test.
    it('should return an array of employees', async () => {
      const returnedResponseFromService = [
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
      const expectedResponse = {
        data: returnedResponseFromService,
      };

      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(returnedResponseFromService);
      const result = await controller.findAll();
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findAllInCompanyJoinUserRole', () => {
    it('should return an array of employees with information form the user and role tables added', async () => {
      const companyId = new Types.ObjectId();
      const returnedResponseFromService = [
        {
          _id: new Types.ObjectId(),
          roleId: Object,
          currentJobAssignments: [new Types.ObjectId()],
          superiorId: new Types.ObjectId(),
          subordinates: [new Types.ObjectId()],
          subordinateTeams: [new Types.ObjectId()],
          userId: Object,
          companyId: new Types.ObjectId(),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      const expectedResponse = {
        data: returnedResponseFromService,
      };

      jest
        .spyOn(service, 'findAllInCompany')
        .mockResolvedValue(returnedResponseFromService);
      const result = await controller.findAllInCompanyJoinUserRole(companyId);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findAllInCompany', () => {
    it('should return an array of employees', async () => {
      const companyId = new Types.ObjectId();
      const returnedResponseFromService = [
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
      const expectedResponse = {
        data: returnedResponseFromService,
      };

      jest
        .spyOn(service, 'findAllInCompany')
        .mockResolvedValue(returnedResponseFromService);
      const result = await controller.findAllInCompanyJoinUserRole(companyId);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findByIdJoinedUserRole', () => {
    it('should return an array of employees with information form the user and role tables added', async () => {
      const employeeId = new Types.ObjectId();
      const returnedResponseFromService = undefined;
      const expectedResponse = {
        data: returnedResponseFromService,
      };

      jest
        .spyOn(service, 'findById')
        .mockResolvedValue(returnedResponseFromService);
      const result = await controller.findAllInCompanyJoinUserRole(employeeId);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findById', () => {
    it('should return an array of employees with information form the user and role tables added', async () => {
      const employeeId = new Types.ObjectId();
      const returnedResponseFromService = undefined;
      const expectedResponse = {
        data: returnedResponseFromService,
      };

      jest
        .spyOn(service, 'findById')
        .mockResolvedValue(returnedResponseFromService);
      const result = await controller.findAllInCompanyJoinUserRole(employeeId);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getOtherEmployees', () => {
    it('should return an array of employees', async () => {
      const employeeId = new Types.ObjectId();
      const companyId = new Types.ObjectId();
      const returnedResponseFromService = [
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
      const expectedResponse = {
        data: returnedResponseFromService,
      };

      jest
        .spyOn(service, 'getListOfOtherEmployees')
        .mockResolvedValue(returnedResponseFromService);
      const result = await controller.getOtherEmployees(employeeId, companyId);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('update', () => {
    it('should return the updated employee', async () => {
      const employeeId = new Types.ObjectId();
      const updateEmployeeDto = {
        roleId: new Types.ObjectId(),
        currentJobAssignments: [new Types.ObjectId()],
        superiorId: new Types.ObjectId(),
        subordinates: [new Types.ObjectId()],
        subordinateTeams: [new Types.ObjectId()],
        userId: new Types.ObjectId(),
        companyId: new Types.ObjectId(),
      };
      const returnedResponseFromService = {
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
      };
      const expectedResponse = {
        data: returnedResponseFromService,
      };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue(returnedResponseFromService);
      const result = await controller.update(employeeId, updateEmployeeDto);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('remove', () => {
    it('should return true if employee is deleted', async () => {
      const employeeId = new Types.ObjectId();
      const returnedResponseFromService = true;
      const expectedResponse = {
        data: returnedResponseFromService,
      };

      jest
        .spyOn(service, 'remove')
        .mockResolvedValue(returnedResponseFromService);
      const result = await controller.remove(employeeId);
      expect(result).toEqual(expectedResponse);
    });

    it('should return false if employee is not deleted', async () => {
      const employeeId = new Types.ObjectId();
      const returnedResponseFromService = false;
      const expectedResponse = {
        data: returnedResponseFromService,
      };

      jest
        .spyOn(service, 'remove')
        .mockResolvedValue(returnedResponseFromService);
      const result = await controller.remove(employeeId);
      expect(result).toEqual(expectedResponse);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { Model } from 'mongoose';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let employeeServiceMock: Partial<EmployeeService>;
  // let employeeModelMock: Partial<Model<Employee>>; // Create a partial mock

  beforeEach(async () => {
    /*    employeeModelMock = {
      find: jest.fn(),
      create: jest.fn(),
      // ...other methods...
    };*/

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [{ provide: EmployeeService, useValue: employeeServiceMock }],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

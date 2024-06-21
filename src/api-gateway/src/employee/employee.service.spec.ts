import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  const employeeModelMock = {
    find: jest.fn(),
    create: jest.fn(),
    // ...other methods...
  };

  const employeeServiceMock = {
    find: jest.fn(),
    create: jest.fn(),
    // ...other methods...
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: EmployeeService, useValue: employeeServiceMock },
        { provide: 'EmployeeModel', useValue: employeeModelMock },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

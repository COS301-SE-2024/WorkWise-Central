import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import {
  UpdateEmployeeDto,
  UpdateEmployeeUserInfoDto,
} from './dto/update-employee.dto';
import { Types } from 'mongoose';
import { Employee } from './entities/employee.entity';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { RoleService } from '../role/role.service';
import { JobService } from '../job/job.service';
import { TeamService } from '../team/team.service';
import { EmployeeRepository } from './employee.repository';
import { ValidationResult } from 'src/auth/entities/validationResult.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject(forwardRef(() => EmployeeRepository))
    private readonly employeeRepository: EmployeeRepository,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly companyService: CompanyService,

    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService,

    @Inject(forwardRef(() => JobService))
    private readonly jobService: JobService,

    private teamService: TeamService,
  ) {}

  async validateCreateEmployee(employee: CreateEmployeeDto) {
    // Checking that the company exists
    if (!(await this.companyService.companyIdExists(employee.companyId))) {
      return new ValidationResult(false, `Company not found`);
    }

    // Checking that the user exists
    if (!(await this.usersService.userIdExists(employee.userId))) {
      return new ValidationResult(false, `User not found`);
    }

    // Checking if the roleId was passed and if it exists
    if (employee.roleId) {
      if (
        !(await this.roleService.roleExistsInCompany(
          employee.roleId,
          employee.companyId,
        ))
      ) {
        return new ValidationResult(false, `Role not found`);
      }
    }

    // Checking if the superiorId was passed and if it exists
    if (employee.superiorId) {
      if (
        !(await this.employeeExistsForCompany(
          employee.superiorId,
          employee.companyId,
        ))
      ) {
        return new ValidationResult(false, `Superior not found`);
      }
    }

    // checking if the user exists in the company
    const user = await this.usersService.getUserById(employee.userId);
    if (await this.usersService.userIsInCompany(user._id, employee.companyId)) {
      return new ValidationResult(false, `User already in company`);
    }

    return new ValidationResult(true, `All good`);
  }

  async validateUpdateEmployee(
    companyId: Types.ObjectId,
    employee: UpdateEmployeeDto,
  ) {
    // Check if the roleId is passed and exists for the company
    if (employee.roleId) {
      if (
        !(await this.roleService.roleExistsInCompany(
          employee.roleId,
          companyId,
        ))
      ) {
        return new ValidationResult(false, `Role not found`);
      }
    }
    // // Check if the currentJobAssignments is passed and exists for the company
    // if (employee.currentJobAssignments) {
    //   for (const jobId of employee.currentJobAssignments) {
    //     if (!(await this.jobService.jobExistsInCompany(jobId, companyId))) {
    //       return new ValidationResult(false, `Job not found`);
    //     }
    //   }
    // }
    // Check if the superiorId is passed and exists for the company
    if (employee.superiorId) {
      if (
        !(await this.employeeExistsForCompany(employee.superiorId, companyId))
      ) {
        return new ValidationResult(false, `Superior not found`);
      }
    }

    // Check if the subordinates is passed and exists for the company
    if (employee.subordinates) {
      for (const subordinateId of employee.subordinates) {
        if (!(await this.employeeExistsForCompany(subordinateId, companyId))) {
          return new ValidationResult(false, `Subordinate not found`);
        }
      }
    }

    // Check if the subordinateTeams is passed and exists for the company
    if (employee.subordinateTeams) {
      for (const teamId of employee.subordinateTeams) {
        if (!(await this.teamService.teamExistsInCompany(teamId, companyId))) {
          return new ValidationResult(false, `Team not found`);
        }
      }
    }
    return new ValidationResult(true, `All good`);
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    const validation = await this.validateCreateEmployee(createEmployeeDto);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }

    const newEmployee = new Employee(createEmployeeDto);
    newEmployee.userId = createEmployeeDto.userId;
    newEmployee.companyId = createEmployeeDto.companyId;
    if (createEmployeeDto.roleId) {
      newEmployee.roleId = createEmployeeDto.roleId;
    }
    if (createEmployeeDto.superiorId) {
      newEmployee.superiorId = createEmployeeDto.superiorId;
    }

    return await this.employeeRepository.save(newEmployee);
  }

  async findAll() {
    return await this.employeeRepository.findAll();
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    //checking if the company exists
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    return await this.employeeRepository.findAllInCompany(companyId);
  }

  async detailedFindAllInCompany(companyId: Types.ObjectId) {
    // const fieldsToJoin = ['userId', 'roleId'];
    //checking if the company exists
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    const all = await this.employeeRepository.findAllInCompany(companyId);
    const result = [];
    for (const employee of all) {
      result.push(await this.detailedFindById(employee._id));
    }
    return result;
  }

  async findById(id: Types.ObjectId) {
    return await this.employeeRepository.findById(id);
  }

  async detailedFindById(id: Types.ObjectId) {
    const employee: any = await this.findById(id);
    const role = await this.roleService.findById(employee.roleId);
    const user = await this.usersService.getUserById(employee.userId);

    delete employee.userId;
    delete employee.roleId;

    employee.role = role;
    employee.user = user;
    return employee;
  }

  async employeeExists(id: Types.ObjectId): Promise<boolean> {
    return await this.employeeRepository.employeeExists(id);
  }

  async employeeExistsForCompany(
    id: Types.ObjectId,
    companyId: Types.ObjectId,
  ): Promise<boolean> {
    //checking if the company exists
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    return await this.employeeRepository.employeeExistsForCompany(
      id,
      companyId,
    );
  }

  async update(id: Types.ObjectId, updateEmployeeDto: UpdateEmployeeDto) {
    const validation = await this.validateUpdateEmployee(id, updateEmployeeDto);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }

    const previousObject = this.employeeRepository.update(
      id,
      updateEmployeeDto,
    );
    return previousObject;
  }

  async updateUserInfo(
    id: Types.ObjectId,
    userInfo: UpdateEmployeeUserInfoDto,
  ) {
    const previousObject = this.employeeRepository.updateUserInfo(id, userInfo);
    return previousObject;
  }

  async getCompanyIdFromEmployee(employeeId: Types.ObjectId) {
    //check if the employee exists
    if (!(await this.employeeExists(employeeId))) {
      throw new Error('Employee does not exist');
    }
    return this.employeeRepository.getCompanyIdFromEmployee(employeeId);
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    if (!(await this.employeeExists(id))) {
      throw new Error('Employee does not exist');
    }
    return await this.employeeRepository.remove(id);
  }

  async findByIds(ids: Types.ObjectId[]) {
    const result = await this.employeeRepository.findByIds(ids);
    if (result.length === 0) {
      return { valid: false, message: 'Employees not found' };
    }
    return result;
  }

  async getSuperior(id: Types.ObjectId) {
    //checking the employee exists
    if (!(await this.employeeExists(id))) {
      throw new Error('Employee does not exist');
    }
    const employee = await this.findById(id);
    if (employee.superiorId) {
      return this.findById(employee.superiorId);
    }
    return null;
  }

  async getSubordinates(id: Types.ObjectId) {
    if (!(await this.employeeExists(id))) {
      throw new Error('Employee does not exist');
    }
    const employee = await this.findById(id);
    if (employee.subordinates) {
      return this.findByIds(employee.subordinates);
    }
    return [];
  }

  async getListOfOtherEmployees(id) {
    const currentEmployee = await this.findById(id);
    const listOfEmployees = await this.findAllInCompany(
      currentEmployee.companyId,
    );

    //checking if the employee exists
    if (!(await this.employeeExists(id))) {
      throw new Error('Employee does not exist');
    }

    //Removing the current employee from the list
    const index = listOfEmployees.findIndex((employee) =>
      employee._id.equals(currentEmployee._id),
    );
    if (index !== -1) {
      listOfEmployees.splice(index, 1);
    }

    // Remove the superior from the list if it exists
    if (currentEmployee.superiorId) {
      const index = listOfEmployees.findIndex((employee) =>
        employee._id.equals(currentEmployee.superiorId),
      );
      if (index !== -1) {
        listOfEmployees.splice(index, 1);
      }
    }

    // Remove subordinates from the list if they exist
    if (
      currentEmployee.subordinates &&
      currentEmployee.subordinates.length > 0
    ) {
      currentEmployee.subordinates.forEach((subordinateId) => {
        const index = listOfEmployees.findIndex((employee) =>
          employee._id.equals(subordinateId),
        );
        if (index !== -1) {
          listOfEmployees.splice(index, 1);
        }
      });
    }

    return listOfEmployees;
  }
}

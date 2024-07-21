import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Types, FlattenMaps } from 'mongoose';
import { Employee } from './entities/employee.entity';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { RoleService } from '../role/role.service';
import { JobService } from '../job/job.service';
import { TeamService } from '../team/team.service';
import { EmployeeRepository } from './employee.repository';

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
      throw new ConflictException('Company not found');
    }

    // Checking that the user exists
    if (!(await this.usersService.userIdExists(employee.userId))) {
      throw new ConflictException('User not found');
    }

    // Checking if the roleId was passed and if it exists
    if (employee.roleId) {
      if (
        !(await this.roleService.roleExistsInCompany(
          employee.roleId,
          employee.companyId,
        ))
      ) {
        throw new ConflictException('Role not found');
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
        throw new ConflictException('Superior not found');
      }
    }
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
        throw new ConflictException('Role not found');
      }
    }
    // Check if the currentJobAssignments is passed and exists for the company
    if (employee.currentJobAssignments) {
      for (const jobId of employee.currentJobAssignments) {
        if (!(await this.jobService.jobExistsInCompany(jobId, companyId))) {
          throw new ConflictException('Job not found');
        }
      }
    }
    // Check if the superiorId is passed and exists for the company
    if (employee.superiorId) {
      if (
        !(await this.employeeExistsForCompany(employee.superiorId, companyId))
      ) {
        throw new ConflictException('Superior not found');
      }
    }

    // Check if the subordinates is passed and exists for the company
    if (employee.subordinates) {
      for (const subordinateId of employee.subordinates) {
        if (!(await this.employeeExistsForCompany(subordinateId, companyId))) {
          throw new ConflictException('Subordinate not found');
        }
      }
    }

    // Check if the subordinateTeams is passed and exists for the company
    if (employee.subordinateTeams) {
      for (const teamId of employee.subordinateTeams) {
        if (!(await this.teamService.teamExistsInCompany(teamId, companyId))) {
          throw new ConflictException('Team not found');
        }
      }
    }
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    console.log('create function');
    try {
      await this.validateCreateEmployee(createEmployeeDto);
      //Checking if the user is in the company
    } catch (error) {
      console.log('error -> ', error);
      throw new InternalServerErrorException(error);
    }

    // checking if the user exists in the company
    const user = await this.usersService.getUserById(createEmployeeDto.userId);
    if (
      await this.usersService.userIsInCompany(
        user._id,
        createEmployeeDto.companyId,
      )
    )
      throw new InternalServerErrorException('Duplicate user');

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

  async findAllInCompany(
    companyId: Types.ObjectId,
    fieldsToPopulate?: string[],
  ) {
    console.log('In findAllInCompany in services. companyId: ', companyId);
    let result;
    if (!(fieldsToPopulate && fieldsToPopulate.length === 0)) {
      console.log('In the if');
      console.log('fieldsToPopulate -> ', fieldsToPopulate);
      result = await this.employeeRepository.findAllInCompany(
        companyId,
        fieldsToPopulate,
      );
    } else {
      result = await this.employeeRepository.findAllInCompany(companyId);
    }
    if (result == null) {
      throw new NotFoundException('Employee not found');
    }
    return result;
  }

  async findById(id: Types.ObjectId, fieldsToPopulate?: string[]) {
    let result;
    if (!(fieldsToPopulate && fieldsToPopulate.length === 0)) {
      console.log('In the if');
      result = await this.employeeRepository.findById(id, fieldsToPopulate);
    } else {
      result = await this.employeeRepository.findById(id);
    }
    if (result == null) {
      throw new NotFoundException('Employee not found');
    }
    return result;
  }

  async employeeExists(id: Types.ObjectId): Promise<boolean> {
    return await this.employeeRepository.employeeExists(id);
  }

  async employeeExistsForCompany(
    id: Types.ObjectId,
    companyId: Types.ObjectId,
  ): Promise<boolean> {
    return await this.employeeRepository.employeeExistsForCompany(
      id,
      companyId,
    );
  }

  async update(id: Types.ObjectId, updateEmployeeDto: UpdateEmployeeDto) {
    // console.log('update function');
    try {
      const companyId = await this.getCompanyIdFromEmployee(id);
      await this.validateUpdateEmployee(companyId, updateEmployeeDto);
    } catch (error) {
      // console.log('error -> ', error);
      return `${error}`;
    }
    const previousObject = this.employeeRepository.update(
      id,
      updateEmployeeDto,
    );
    return previousObject;
  }

  async getCompanyIdFromEmployee(employeeId: Types.ObjectId) {
    return this.employeeRepository.getCompanyIdFromEmployee(employeeId);
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    return await this.employeeRepository.remove(id);
  }

  async findByIds(
    ids: Types.ObjectId[],
  ): Promise<(FlattenMaps<Employee> & { _id: Types.ObjectId })[]> {
    const result = await this.employeeRepository.findByIds(ids);
    if (result.length === 0) {
      throw new NotFoundException('Employees not found');
    }
    return result;
  }

  async getSuperior(id: Types.ObjectId) {
    const employee = await this.findById(id);
    if (employee.superiorId) {
      return this.findById(employee.superiorId);
    }
    return null;
  }

  async getSubordinates(id: Types.ObjectId) {
    const employee = await this.findById(id);
    if (employee.subordinates) {
      return this.findByIds(employee.subordinates);
    }
    return [];
  }

  async getListOfOtherEmployees(id, companyId) {
    console.log('In the service. id', id);
    const currentEmployee = await this.findById(id);
    console.log('currentEmployee', currentEmployee);
    const listOfEmployees = await this.findAllInCompany(companyId);
    console.log('listOfEmployees', listOfEmployees);

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

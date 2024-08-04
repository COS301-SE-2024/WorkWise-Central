import { InventoryService } from './../inventory/inventory.service';
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
import { ValidationResult } from '../auth/entities/validationResult.entity';
import { ClientService } from 'src/client/client.service';

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

    @Inject(forwardRef(() => ClientService))
    private clientService: ClientService,

    @Inject(forwardRef(() => InventoryService))
    private inventoryService: InventoryService,
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
    employeeId: Types.ObjectId,
    employee: UpdateEmployeeDto,
  ) {
    const currentEmployee = await this.findById(employeeId);
    const companyId = currentEmployee.companyId;
    // console.log('In validateUpdateEmployee');
    // console.log('employee: ', employee);
    // console.log('companyId: ', companyId);
    // Check if the roleId is passed and exists for the company
    if (employee.roleId) {
      // console.log('employee.roleId: ', employee.roleId);
      if (
        !(await this.roleService.roleExistsInCompany(
          employee.roleId,
          companyId,
        ))
      ) {
        return new ValidationResult(false, `Role not found`);
      }
    }
    // console.log('checkpoint 1');

    if (employee.superiorId) {
      if (
        !(await this.employeeExistsForCompany(employee.superiorId, companyId))
      ) {
        return new ValidationResult(false, `Superior not found`);
      }
    }

    // console.log('checkpoint 2');

    // Check if the subordinates is passed and exists for the company
    if (employee.subordinates) {
      for (const subordinateId of employee.subordinates) {
        if (!(await this.employeeExistsForCompany(subordinateId, companyId))) {
          return new ValidationResult(false, `Subordinate not found`);
        }
      }
    }

    // console.log('checkpoint 3');

    // Check if the subordinateTeams is passed and exists for the company
    if (employee.subordinateTeams) {
      for (const teamId of employee.subordinateTeams) {
        if (!(await this.teamService.teamExistsInCompany(teamId, companyId))) {
          return new ValidationResult(false, `Team not found`);
        }
      }
    }
    // console.log('checkpoint 4');
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
    // console.log('In findAllInCompany');
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    // console.log('checkpoint 2');
    return await this.employeeRepository.findAllInCompany(companyId);
  }

  async detailedFindAllInCompany(companyId: Types.ObjectId) {
    //checking if the company exists
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    const employees: any =
      await this.employeeRepository.DetailedFindAllInCompany(companyId, [
        'roleId',
        'userId',
      ]);

    return employees;
  }

  async findById(id: Types.ObjectId) {
    // console.log('In findById service');
    return await this.employeeRepository.findById(id);
  }

  async detailedFindById(id: Types.ObjectId) {
    const employee: any = await this.employeeRepository.DetailedFindById(id, [
      'roleId',
      'userId',
    ]);

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

  async update(
    employeeId: Types.ObjectId,
    updateEmployeeDto: UpdateEmployeeDto,
  ) {
    // console.log('In update');
    const validation = await this.validateUpdateEmployee(
      employeeId,
      updateEmployeeDto,
    );
    // console.log('validation: ', validation);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    //******Updating the structure*********/

    if (updateEmployeeDto.superiorId && updateEmployeeDto.subordinates) {
      //Case: the superior and subordinate is being updated
      //Check that the superior is not a subordinate and vice versa

      updateEmployeeDto.subordinates.forEach((subordinate) => {
        if (subordinate === updateEmployeeDto.superiorId) {
          throw new Error('Superior cannot be a subordinate');
        }
      });
      //Check that the employee being made the superior does not have the current employee as a superior

      const superiorEmployee = await this.findById(
        updateEmployeeDto.superiorId,
      );

      if (superiorEmployee.superiorId === employeeId) {
        throw new Error('Superior cannot be a subordinate');
      }
      //Check that the employee being made a subordinate does not have the current employee as a subordinate
      updateEmployeeDto.subordinates.forEach(async (subordinate) => {
        const subordinateEmployee = await this.findById(subordinate);
        if (subordinateEmployee.subordinates.includes(employeeId)) {
          throw new Error('Subordinate cannot be a superior');
        }
      });
      //Update the superior employee to have the updated employee as a subordinate
      const list = superiorEmployee.subordinates;
      list.push(employeeId);
      await this.employeeRepository.updateSubordinates(
        superiorEmployee._id,
        list,
      );
      //Update the subordinates to have the updated employee as a superior
      updateEmployeeDto.subordinates.forEach(async (subordinateId) => {
        await this.employeeRepository.updateSuperior(subordinateId, employeeId);
      });
    } else if (
      updateEmployeeDto.superiorId &&
      !updateEmployeeDto.subordinates
    ) {
      //Case: superior is being updated not subordinates
      //Check that the superior is not a subordinate
      const employeeToBeUpdated = await this.findById(employeeId);
      if (employeeToBeUpdated.subordinates) {
        if (
          employeeToBeUpdated.subordinates.includes(
            updateEmployeeDto.superiorId,
          )
        ) {
          throw new Error('Superior cannot be a subordinate');
        }
      }
      //Check that the employee being made the superior does not have the current employee as a superior
      const superiorEmployee = await this.findById(
        updateEmployeeDto.superiorId,
      );
      if (superiorEmployee.superiorId === employeeId) {
        throw new Error('Superior cannot be a subordinate');
      }
      //Update the superior employee to have the updated employee as a subordinate
      const list = superiorEmployee.subordinates;
      list.push(employeeId);
      await this.employeeRepository.updateSubordinates(
        superiorEmployee._id,
        list,
      );
    } else if (
      updateEmployeeDto.subordinates &&
      !updateEmployeeDto.superiorId
    ) {
      //Case: Only the subordinates are being updated.
      //Check that the subordinates are not the superior
      updateEmployeeDto.subordinates.forEach((subordinate) => {
        if (subordinate === employeeId) {
          throw new Error('Subordinate cannot be a superior');
        }
      });
      //Check that the employee being made a subordinate does not have the current employee as a subordinate
      updateEmployeeDto.subordinates.forEach(async (subordinate) => {
        const subordinateEmployee = await this.findById(subordinate);
        if (subordinateEmployee.subordinates.includes(employeeId)) {
          throw new Error('Subordinate cannot be a superior');
        }
      });
      //Update the subordinates to have the updated employee as a superior
      updateEmployeeDto.subordinates.forEach(async (subordinateId) => {
        await this.employeeRepository.updateSuperior(subordinateId, employeeId);
      });
    }

    //Altering the dto to update the role if roleId is given
    if (updateEmployeeDto.roleId) {
      const role = await this.roleService.findById(updateEmployeeDto.roleId);
      delete updateEmployeeDto.roleId;
      updateEmployeeDto.role = {
        roleId: role._id,
        permissionSuite: role.permissionSuite,
      };
    } else {
      delete updateEmployeeDto.roleId;
    }

    const previousObject = this.employeeRepository.update(
      employeeId,
      updateEmployeeDto,
    );
    return previousObject;
  }

  async updateUnderMe(
    userId: Types.ObjectId,
    employeeId: Types.ObjectId,
    updateEmployeeDto: UpdateEmployeeDto,
    currentEmployeeId: Types.ObjectId,
  ) {
    const validation = await this.validateUpdateEmployee(
      employeeId,
      currentEmployeeId,
      updateEmployeeDto,
    );
    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    if (!(await this.isBelowMe(currentEmployeeId, employeeId))) {
      throw new Error('Employee not below the requesting employee');
    }
    //******Updating the structure*********/

    if (updateEmployeeDto.superiorId && updateEmployeeDto.subordinates) {
      //Case: the superior and subordinate is being updated
      //Check that the superior is not a subordinate and vice versa

      updateEmployeeDto.subordinates.forEach((subordinate) => {
        if (subordinate === updateEmployeeDto.superiorId) {
          throw new Error('Superior cannot be a subordinate');
        }
      });
      //Check that the employee being made the superior does not have the current employee as a superior

      const superiorEmployee = await this.findById(
        updateEmployeeDto.superiorId,
      );

      if (superiorEmployee.superiorId === employeeId) {
        throw new Error('Superior cannot be a subordinate');
      }
      //Check that the employee being made a subordinate does not have the current employee as a subordinate
      updateEmployeeDto.subordinates.forEach(async (subordinate) => {
        const subordinateEmployee = await this.findById(subordinate);
        if (subordinateEmployee.subordinates.includes(employeeId)) {
          throw new Error('Subordinate cannot be a superior');
        }
      });
      //Update the superior employee to have the updated employee as a subordinate
      const list = superiorEmployee.subordinates;
      list.push(employeeId);
      await this.employeeRepository.updateSubordinates(
        superiorEmployee._id,
        list,
      );
      //Update the subordinates to have the updated employee as a superior
      updateEmployeeDto.subordinates.forEach(async (subordinateId) => {
        await this.employeeRepository.updateSuperior(subordinateId, employeeId);
      });
    } else if (
      updateEmployeeDto.superiorId &&
      !updateEmployeeDto.subordinates
    ) {
      //Case: superior is being updated not subordinates
      //Check that the superior is not a subordinate
      const employeeToBeUpdated = await this.findById(employeeId);
      if (employeeToBeUpdated.subordinates) {
        if (
          employeeToBeUpdated.subordinates.includes(
            updateEmployeeDto.superiorId,
          )
        ) {
          throw new Error('Superior cannot be a subordinate');
        }
      }
      //Check that the employee being made the superior does not have the current employee as a superior
      const superiorEmployee = await this.findById(
        updateEmployeeDto.superiorId,
      );
      if (superiorEmployee.superiorId === employeeId) {
        throw new Error('Superior cannot be a subordinate');
      }
      //Update the superior employee to have the updated employee as a subordinate
      const list = superiorEmployee.subordinates;
      list.push(employeeId);
      await this.employeeRepository.updateSubordinates(
        superiorEmployee._id,
        list,
      );
    } else if (
      updateEmployeeDto.subordinates &&
      !updateEmployeeDto.superiorId
    ) {
      //Case: Only the subordinates are being updated.
      //Check that the subordinates are not the superior
      updateEmployeeDto.subordinates.forEach((subordinate) => {
        if (subordinate === employeeId) {
          throw new Error('Subordinate cannot be a superior');
        }
      });
      //Check that the employee being made a subordinate does not have the current employee as a subordinate
      updateEmployeeDto.subordinates.forEach(async (subordinate) => {
        const subordinateEmployee = await this.findById(subordinate);
        if (subordinateEmployee.subordinates.includes(employeeId)) {
          throw new Error('Subordinate cannot be a superior');
        }
      });
      //Update the subordinates to have the updated employee as a superior
      updateEmployeeDto.subordinates.forEach(async (subordinateId) => {
        await this.employeeRepository.updateSuperior(subordinateId, employeeId);
      });
    }

    //Altering the dto to update the role if roleId is given
    if (updateEmployeeDto.roleId) {
      const role = await this.roleService.findById(updateEmployeeDto.roleId);
      delete updateEmployeeDto.roleId;
      updateEmployeeDto.role = {
        roleId: role._id,
        permissionSuite: role.permissionSuite,
      };
    } else {
      delete updateEmployeeDto.roleId;
    }

    const previousObject = this.employeeRepository.update(
      employeeId,
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

  async removeUnderMe(
    userId: Types.ObjectId,
    id: Types.ObjectId,
  ): Promise<boolean> {
    if (!(await this.employeeExists(id))) {
      throw new Error('Employee does not exist');
    }

    //checking that the employee is under the requesting employee
    const companyId = await this.getCompanyIdFromEmployee(id);
    const currentEmployeeId = await this.getRequestingEmployeeFromCompanyId(
      companyId,
      userId,
    );
    if (!(await this.isBelowMe(currentEmployeeId, id))) {
      throw new Error('Employee not below the requesting employee');
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

  async getListOfOtherEmployees(employeeId: Types.ObjectId) {
    // console.log('In getListOfOtherEmployees');
    // console.log('employeeId: ', employeeId);
    const currentEmployee = await this.findById(employeeId);
    // console.log('currentEmployee: ', currentEmployee);
    const listOfEmployees = await this.findAllInCompany(
      currentEmployee.companyId,
    );

    //checking if the employee exists
    if (!(await this.employeeExists(employeeId))) {
      // throw new Error('Employee does not exist');
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

  async getRequestingEmployeeFromCompanyId(
    companyId: Types.ObjectId,
    userId: Types.ObjectId,
  ) {
    // console.log('In getRequestingEmployeeFromCompanyId');
    // console.log('companyId: ', companyId);
    // console.log('userId: ', userId);
    const user = await this.usersService.getUserById(userId);
    const companies = user.joinedCompanies;
    // console.log('companies: ', companies);
    let employeeId: Types.ObjectId;
    companies.forEach((company) => {
      // console.log('In forEach. Company: ', company);
      // console.log('company.companyId: ', company.companyId);
      if (company.companyId.toString() === companyId.toString()) {
        // console.log('In if');
        employeeId = company.employeeId;
      }
    });
    return employeeId;
  }

  async validateRoleCompanyId(
    companyId: Types.ObjectId,
    userId: Types.ObjectId,
    permission: string,
  ) {
    // console.log('In validateRoleCompanyId');
    const employeeId = await this.getRequestingEmployeeFromCompanyId(
      companyId,
      userId,
    );
    // console.log('checkpoint 1');
    // console.log('permission: .', permission, '.');
    return this.roleService.hasPermission(permission, employeeId);
  }

  async validateRoleEmployeeId(
    id: Types.ObjectId,
    userId: Types.ObjectId,
    permission: string,
  ) {
    // console.log('In validateRoleEmployeeId');
    const employee = await this.findById(id);
    const employeeId = await this.getRequestingEmployeeFromCompanyId(
      employee.companyId,
      userId,
    );
    // console.log('Permission: ', permission);
    // console.log('EmployeeId: ', employeeId);
    return this.roleService.hasPermission(permission, employeeId);
  }

  async validateRoleJobId(
    id: Types.ObjectId,
    userId: Types.ObjectId,
    permission: string,
  ) {
    const job = await this.jobService.findJobById(id);
    const employeeId = await this.getRequestingEmployeeFromCompanyId(
      job.companyId,
      userId,
    );
    return this.roleService.hasPermission(permission, employeeId);
  }

  async validateRoleClientId(
    id: Types.ObjectId,
    userId: Types.ObjectId,
    permission: string,
  ) {
    const client = await this.clientService.getClientById(userId, id);
    const employeeId = await this.getRequestingEmployeeFromCompanyId(
      client.details.companyId,
      userId,
    );
    return this.roleService.hasPermission(permission, employeeId);
  }

  async validateRoleTeamId(
    id: Types.ObjectId,
    userId: Types.ObjectId,
    permission: string,
  ) {
    const team = await this.teamService.findById(id);
    const employeeId = await this.getRequestingEmployeeFromCompanyId(
      team.companyId,
      userId,
    );
    return this.roleService.hasPermission(permission, employeeId);
  }

  async validateRoleRoleId(
    id: Types.ObjectId,
    userId: Types.ObjectId,
    permission: string,
  ) {
    const role = await this.roleService.findById(id);
    const employeeId = await this.getRequestingEmployeeFromCompanyId(
      role.companyId,
      userId,
    );
    return this.roleService.hasPermission(permission, employeeId);
  }

  async validateRoleInventoryId(
    id: Types.ObjectId,
    userId: Types.ObjectId,
    permission: string,
  ) {
    const inventory = await this.inventoryService.findById(id);
    const employeeId = await this.getRequestingEmployeeFromCompanyId(
      inventory.companyId,
      userId,
    );
    return this.roleService.hasPermission(permission, employeeId);
  }

  async validateRole(
    companyId: Types.ObjectId,
    userId: Types.ObjectId,
    permission: string,
  ) {
    const employeeId = await this.getRequestingEmployeeFromCompanyId(
      companyId,
      userId,
    );
    return this.roleService.hasPermission(permission, employeeId);
  }

  async deptFirstTraversalId(id: Types.ObjectId) {
    // console.log('In the depth first traversal function');
    let currentEmployee = await this.findById(id);
    let subordinateList = currentEmployee.subordinates;
    let currentId = id;
    const open: Types.ObjectId[] = [];
    const closed: Types.ObjectId[] = [];

    if (subordinateList !== null) {
      subordinateList.forEach((sub) => {
        open.push(sub);
      });
    }
    closed.push(id);

    while (open.length !== 0) {
      currentId = open.shift();
      currentEmployee = await this.findById(currentId);
      subordinateList = currentEmployee.subordinates;
      if (subordinateList !== null) {
        subordinateList.reverse();
        subordinateList.forEach((sub) => {
          open.unshift(sub);
        });
      }
      closed.push(currentId);
    }
    return closed;
  }

  async deptFirstTraversalObjects(id: Types.ObjectId) {
    console.log('In the depth first traversal function');
    let currentEmployee = await this.findById(id);
    let subordinateList = currentEmployee.subordinates;
    let currentId = id;
    const open: Types.ObjectId[] = [];
    const closed: Types.ObjectId[] = [];
    const employees: Employee[] = [];
    if (subordinateList !== null) {
      subordinateList.forEach((sub) => {
        open.push(sub);
      });
    }
    employees.push(currentEmployee);
    closed.push(id);

    while (open.length !== 0) {
      console.log('In while loop');
      console.log('open: ', open);
      currentId = open.shift();
      currentEmployee = await this.findById(currentId);
      subordinateList = currentEmployee.subordinates;
      if (subordinateList !== null) {
        subordinateList.reverse();
        subordinateList.forEach((sub) => {
          open.unshift(sub);
        });
      }
      employees.push(currentEmployee);
      closed.push(currentId);
    }
    return employees;
  }

  async deptFirstTraversalDetailed(id: Types.ObjectId) {
    // console.log('In the depth first traversal function');
    let currentEmployee = await this.detailedFindById(id);
    let subordinateList = currentEmployee.subordinates;
    let currentId = id;
    const open: Types.ObjectId[] = [];
    const closed: Types.ObjectId[] = [];
    const employees: Employee[] = [];
    if (subordinateList !== null) {
      subordinateList.forEach((sub) => {
        open.push(sub);
      });
    }
    employees.push(currentEmployee);
    closed.push(id);

    while (open.length !== 0) {
      currentId = open.shift();
      currentEmployee = await this.detailedFindById(currentId);
      subordinateList = currentEmployee.subordinates;
      if (subordinateList !== null) {
        subordinateList.reverse();
        subordinateList.forEach((sub) => {
          open.unshift(sub);
        });
      }
      employees.push(currentEmployee);
      closed.push(currentId);
    }
    return employees;
  }

  async isBelowMe(
    currentEmployeeId: Types.ObjectId,
    otherEmployeeId: Types.ObjectId,
  ) {
    const list = await this.deptFirstTraversalId(currentEmployeeId);

    return list.includes(otherEmployeeId);
  }

  async detailedFindBelowMeInCompany(
    userId: Types.ObjectId,
    companyId: Types.ObjectId,
  ) {
    try {
      const employeeId = await this.getRequestingEmployeeFromCompanyId(
        companyId,
        userId,
      );
      const list = await this.deptFirstTraversalDetailed(employeeId);
      return list;
    } catch (error) {
      throw new Error(
        'Employee id for given userId and companyId could not be found',
      );
    }
  }

  async findBelowMeInCompany(
    userId: Types.ObjectId,
    companyId: Types.ObjectId,
  ) {
    console.log('In findBelowMeInCompany');
    try {
      console.log('In try');
      const employeeId = await this.getRequestingEmployeeFromCompanyId(
        companyId,
        userId,
      );
      console.log('employeeId: ', employeeId);
      const list = await this.deptFirstTraversalObjects(employeeId);
      console.log('list: ', list);
      return list;
    } catch (error) {
      throw new Error(
        'Employee id for given userId and companyId could not be found',
      );
    }
  }
  async detailedFindByIdUnderMe(
    userId: Types.ObjectId,
    employeeId: Types.ObjectId,
  ) {
    const companyId = await this.getCompanyIdFromEmployee(employeeId);
    const currentEmployeeId = await this.getRequestingEmployeeFromCompanyId(
      companyId,
      userId,
    );
    const employee = await this.detailedFindById(employeeId);
    if (await this.isBelowMe(currentEmployeeId, employeeId)) {
      return employee;
    } else {
      throw new Error('Employee not below the requesting employee');
    }
  }

  async findByIdUnderMe(userId: Types.ObjectId, employeeId: Types.ObjectId) {
    const companyId = await this.getCompanyIdFromEmployee(employeeId);
    const currentEmployeeId = await this.getRequestingEmployeeFromCompanyId(
      companyId,
      userId,
    );
    const employee = await this.findById(employeeId);
    if (await this.isBelowMe(currentEmployeeId, employeeId)) {
      return employee;
    } else {
      throw new Error('Employee not below the requesting employee');
    }
  }
}

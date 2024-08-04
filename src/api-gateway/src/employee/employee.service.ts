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
      } else {
        //Checking that the superior is valid
        const superior = await this.findById(employee.superiorId);
        if (superior.subordinates) {
          if (superior.subordinates.includes(employee.superiorId)) {
            return new ValidationResult(
              false,
              `Superior is already a subordinate`,
            );
          }
        }
      }
    } else {
      //Adding the owner as the superior if no superior is passed
      const ownerRole = await this.roleService.findOneInCompany(
        'Owner',
        employee.companyId,
      );
      const owner = await this.findAllInCompanyWithRole(
        employee.companyId,
        ownerRole._id,
      );
      employee.superiorId = owner[0]._id;
    }

    // checking if the user exists in the company
    const user = await this.usersService.getUserById(employee.userId);
    if (await this.usersService.userIsInCompany(user._id, employee.companyId)) {
      return new ValidationResult(false, `User already in company`);
    }

    return new ValidationResult(true, `All good`);
  }

  async validateUpdateEmployee(
    employeeToBeUpdatedId: Types.ObjectId,
    currentemployeeId: Types.ObjectId,
    updateEmployeeDto: UpdateEmployeeDto,
  ) {
    const currentEmployee = await this.findById(currentemployeeId);
    // const employeeToBeUpdated = await this.findById(employeeToBeUpdatedId);
    const companyId = currentEmployee.companyId;
    if (updateEmployeeDto.roleId) {
      if (
        !(await this.roleService.roleExistsInCompany(
          updateEmployeeDto.roleId,
          companyId,
        ))
      ) {
        return new ValidationResult(false, `Role not found`);
      }
    }
    //Simply checking that the superior exists
    if (updateEmployeeDto.superiorId) {
      if (
        !(await this.employeeExistsForCompany(
          updateEmployeeDto.superiorId,
          companyId,
        ))
      ) {
        return new ValidationResult(false, `Superior not found`);
      }
    }
    //Simply checking that the subordinates exists
    if (updateEmployeeDto.subordinates) {
      for (const subordinateId of updateEmployeeDto.subordinates) {
        if (!(await this.employeeExistsForCompany(subordinateId, companyId))) {
          return new ValidationResult(false, `Subordinate not found`);
        }
      }
    }

    // Check if the subordinateTeams is passed and exists for the company
    if (updateEmployeeDto.subordinateTeams) {
      for (const teamId of updateEmployeeDto.subordinateTeams) {
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
    //Altering the dto to save the role if roleId is given
    if (createEmployeeDto.roleId) {
      const role = await this.roleService.findById(createEmployeeDto.roleId);
      delete createEmployeeDto.roleId;
      createEmployeeDto.role = {
        roleId: role._id,
        permissionSuite: role.permissionSuite,
      };
    } else {
      const role = await this.roleService.findOneInCompany(
        'Default',
        createEmployeeDto.companyId,
      );
      delete createEmployeeDto.roleId;
      createEmployeeDto.role = {
        roleId: role._id,
        permissionSuite: role.permissionSuite,
      };
    }
    const newEmployee = new Employee(createEmployeeDto);
    newEmployee.userId = createEmployeeDto.userId;
    newEmployee.companyId = createEmployeeDto.companyId;
    if (createEmployeeDto.roleId) {
      newEmployee.role.roleId = createEmployeeDto.roleId;
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
    currentEmployeeId: Types.ObjectId,
    updateEmployeeDto: UpdateEmployeeDto,
  ) {
    const validation = await this.validateUpdateEmployee(
      employeeId,
      currentEmployeeId,
      updateEmployeeDto,
    );
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
    currentEmployeeId: Types.ObjectId,
  ): Promise<boolean> {
    if (!(await this.employeeExists(id))) {
      throw new Error('Employee does not exist');
    }
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
    const currentEmployee = await this.findById(employeeId);
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

  async deptFirstTraversalId(id: Types.ObjectId) {
    const currentEmployee = await this.findById(id);
    const listOfEmployees = await this.findAllInCompany(
      currentEmployee.companyId,
    );
    const employeeList: Types.ObjectId[] = [];
    const open: Types.ObjectId[] = [];
    const closed: Types.ObjectId[] = [];
    employeeList.push(id);
    open.push(...currentEmployee.subordinates);
    closed.push(currentEmployee._id);

    while (open.length !== 0) {
      const currentId = open.shift();
      const currentEmployee = listOfEmployees.find((employee) =>
        employee._id.equals(currentId),
      );
      employeeList.push(currentEmployee._id);
      open.push(...currentEmployee.subordinates);
      closed.push(currentId);
    }
    return employeeList;
  }

  async deptFirstTraversalObjects(id: Types.ObjectId) {
    const currentEmployee = await this.findById(id);
    const listOfEmployees = await this.findAllInCompany(
      currentEmployee.companyId,
    );
    const employeeList: Employee[] = [];
    const open: Types.ObjectId[] = [];
    const closed: Types.ObjectId[] = [];
    employeeList.push(currentEmployee);
    open.push(...currentEmployee.subordinates);
    closed.push(currentEmployee._id);

    while (open.length !== 0) {
      const currentId = open.shift();
      const currentEmployee = listOfEmployees.find((employee) =>
        employee._id.equals(currentId),
      );
      employeeList.push(currentEmployee);
      open.push(...currentEmployee.subordinates);
      closed.push(currentId);
    }
    return employeeList;
  }

  async deptFirstTraversalDetailed(id: Types.ObjectId) {
    const currentEmployee = await this.findById(id);
    const listOfEmployees = await this.detailedFindAllInCompany(
      currentEmployee.companyId,
    );
    const employeeList: Employee[] = [];
    const open: Types.ObjectId[] = [];
    const closed: Types.ObjectId[] = [];
    employeeList.push(currentEmployee);
    open.push(...currentEmployee.subordinates);
    closed.push(currentEmployee._id);

    while (open.length !== 0) {
      const currentId = open.shift();
      const currentEmployee = listOfEmployees.find((employee) =>
        employee._id.equals(currentId),
      );
      employeeList.push(currentEmployee);
      open.push(...currentEmployee.subordinates);
      closed.push(currentId);
    }
    return employeeList;
  }

  async isBelowMe(
    currentEmployeeId: Types.ObjectId,
    otherEmployeeId: Types.ObjectId,
  ) {
    const list = await this.deptFirstTraversalId(currentEmployeeId);
    let found = false;
    list.forEach((employee) => {
      if (employee.toString() === otherEmployeeId.toString()) {
        found = true;
      }
    });
    return found;
  }

  async detailedFindBelowMeInCompany(currentEmployeeId: Types.ObjectId) {
    try {
      return await this.deptFirstTraversalDetailed(currentEmployeeId);
    } catch (error) {
      throw new Error(
        'Employee id for given userId and companyId could not be found',
      );
    }
  }

  async findBelowMeInCompany(currentEmployeeId: Types.ObjectId) {
    try {
      return await this.deptFirstTraversalObjects(currentEmployeeId);
    } catch (error) {
      throw new Error(
        'Employee id for given userId and companyId could not be found',
      );
    }
  }

  async findIdsBelowMeInCompany(currentEmployeeId: Types.ObjectId) {
    try {
      return await this.deptFirstTraversalId(currentEmployeeId);
    } catch (error) {
      throw new Error(
        'Employee id for given userId and companyId could not be found',
      );
    }
  }

  async detailedFindByIdUnderMe(
    userId: Types.ObjectId,
    employeeId: Types.ObjectId,
    currentEmployeeId: Types.ObjectId,
  ) {
    if (await this.isBelowMe(currentEmployeeId, employeeId)) {
      return await this.detailedFindById(currentEmployeeId);
    } else {
      throw new Error('Employee not below the requesting employee');
    }
  }

  async findByIdUnderMe(
    userId: Types.ObjectId,
    employeeId: Types.ObjectId,
    currentEmployeeId: Types.ObjectId,
  ) {
    if (await this.isBelowMe(currentEmployeeId, employeeId)) {
      return await this.findById(employeeId);
    } else {
      throw new Error('Employee not below the requesting employee');
    }
  }

  async findAllInCompanyWithRole(
    companyId: Types.ObjectId,
    roleId: Types.ObjectId,
  ) {
    return await this.employeeRepository.findAllInCompanyWithRole(
      companyId,
      roleId,
    );
  }

  // async roleUpdate(roleId: Types.ObjectId, companyId: Types.ObjectId) {
  //   //finding all employees in a company
  //   const list = await this.findAllInCompanyWithRole(companyId, roleId);
  //   //updating the role for all employees
  //   list.forEach(async (employee) => {
  //     await this.update(employee._id, { roleId: roleId });
  //   });
  // }
}

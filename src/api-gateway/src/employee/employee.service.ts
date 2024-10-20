import { InternalUpdateEmployeeDto, UpdateEmployeeUserInfoDto } from './dto/internal-update-employee.dto';
import { InventoryService } from '../inventory/inventory.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateEmployeeDto, ExternalCreateEmployeeDto } from './dto/create-employee.dto';
import { AddSubordinatesDto, RemoveSubordinatesDto, UpdateEmployeeDto } from './dto/update-employee.dto';
import { Types } from 'mongoose';
import { Employee, roleObject } from './entities/employee.entity';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { RoleService } from '../role/role.service';
import { JobService } from '../job/job.service';
import { TeamService } from '../team/team.service';
import { EmployeeRepository } from './employee.repository';
import { ValidationResult } from '../auth/entities/validationResult.entity';
import { ClientService } from '../client/client.service';
import { UpdateRoleDto } from '../role/dto/update-role.dto';
import { Edges, Nodes } from 'v-network-graph';
import { Exception } from 'handlebars';
import { StockMovementsService } from '../stockmovements/stockmovements.service';

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

    @Inject(forwardRef(() => TeamService))
    private teamService: TeamService,

    @Inject(forwardRef(() => ClientService))
    private clientService: ClientService,

    @Inject(forwardRef(() => InventoryService))
    private inventoryService: InventoryService,

    @Inject(forwardRef(() => StockMovementsService))
    private readonly stockMovementsService: StockMovementsService,
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
      if (!(await this.roleService.roleExistsInCompany(employee.roleId, employee.companyId))) {
        return new ValidationResult(false, `Role not found`);
      }
    }
    // Checking if the superiorId was passed and if it exists
    if (employee.superiorId) {
      if (!(await this.employeeExistsForCompany(employee.superiorId, employee.companyId))) {
        return new ValidationResult(false, `Superior not found`);
      } else {
        //Checking that the superior is valid
        const superior = await this.findById(employee.superiorId);
        if (superior.subordinates) {
          if (superior.subordinates.includes(employee.superiorId)) {
            return new ValidationResult(false, `Superior is already a subordinate`);
          }
        }
      }
    } else {
      //Adding the owner as the superior if no superior is passed
      try {
        const owner = await this.findAllInCompanyWithRoleName(employee.companyId, 'Owner');
        employee.superiorId = owner[0]._id;
      } catch (e) {}
    }
    // checking if the user exists in the company
    const user = await this.usersService.getUserById(employee.userId);
    if (await this.usersService.userIsInCompany(user._id, employee.companyId)) {
      return new ValidationResult(false, `User already in company`);
    }

    return new ValidationResult(true, `All good`);
  }

  async validateUpdateEmployee(updateEmployeeDto: UpdateEmployeeDto) {
    const currentEmployee = await this.findById(updateEmployeeDto.currentEmployeeId);
    // const employeeToBeUpdated = await this.findById(employeeToBeUpdatedId);
    const companyId = currentEmployee.companyId;
    if (updateEmployeeDto.roleId) {
      if (!(await this.roleService.roleExistsInCompany(updateEmployeeDto.roleId, companyId))) {
        return new ValidationResult(false, `Role not found`);
      }
    }
    //Simply checking that the superior exists
    if (updateEmployeeDto.superiorId) {
      if (!(await this.employeeExistsForCompany(updateEmployeeDto.superiorId, companyId))) {
        return new ValidationResult(false, `Superior not found`);
      }
    }
    return new ValidationResult(true, `All good`);
  }

  async create(createEmployeeDto: ExternalCreateEmployeeDto) {
    const validation = await this.validateCreateEmployee(createEmployeeDto);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    const newEmployee = new Employee();
    newEmployee.userId = createEmployeeDto.userId;
    newEmployee.companyId = createEmployeeDto.companyId;
    if (!createEmployeeDto.superiorId) {
      const owner = await this.findAllInCompanyWithRoleName(createEmployeeDto.companyId, 'Owner');
      newEmployee.superiorId = owner[0]._id;
    } else {
      newEmployee.superiorId = createEmployeeDto.superiorId;
    }
    if (createEmployeeDto.userInfo) {
      newEmployee.userInfo.displayImage = createEmployeeDto.userInfo.displayImage;
      newEmployee.userInfo.displayName = createEmployeeDto.userInfo.displayName;
      newEmployee.userInfo.firstName = createEmployeeDto.userInfo.firstName;
      newEmployee.userInfo.surname = createEmployeeDto.userInfo.surname;
      newEmployee.userInfo.username = createEmployeeDto.userInfo.username;
    }
    if (createEmployeeDto.roleId) {
      const role = await this.roleService.findById(createEmployeeDto.roleId);
      newEmployee.role.roleId = new Types.ObjectId(role._id);
      newEmployee.role.permissionSuite = role.permissionSuite;
      newEmployee.role.roleName = role.roleName;
    } else {
      const role = await this.roleService.findOneInCompany('Default', createEmployeeDto.companyId);
      newEmployee.role.roleId = role._id;
      newEmployee.role.permissionSuite = role.permissionSuite;
    }

    if (createEmployeeDto.hourlyRate) {
      newEmployee.hourlyRate = createEmployeeDto.hourlyRate;
    } else {
      const role = await this.roleService.findById(newEmployee.role.roleId);
      newEmployee.hourlyRate = role.hourlyRate;
    }

    const savedEmployee = await this.employeeRepository.save(newEmployee);

    //Updating the subordinates of the newEmployee
    const dto = new AddSubordinatesDto();
    dto.currentEmployeeId = createEmployeeDto.currentEmployeeId;
    dto.subordinatesToBeAdded = [savedEmployee._id];
    await this.addSubordinates(savedEmployee.superiorId, dto);

    return savedEmployee;
  }

  async createOwner(createEmployeeDto: ExternalCreateEmployeeDto) {
    const newEmployee = new Employee();
    newEmployee.userId = createEmployeeDto.userId;
    newEmployee.companyId = createEmployeeDto.companyId;

    if (createEmployeeDto.userInfo) {
      newEmployee.userInfo.displayImage = createEmployeeDto.userInfo.displayImage;
      newEmployee.userInfo.displayName = createEmployeeDto.userInfo.displayName;
      newEmployee.userInfo.firstName = createEmployeeDto.userInfo.firstName;
      newEmployee.userInfo.surname = createEmployeeDto.userInfo.surname;
      newEmployee.userInfo.username = createEmployeeDto.userInfo.username;
    }
    if (createEmployeeDto.roleId) {
      const role = await this.roleService.findById(createEmployeeDto.roleId);
      newEmployee.role.roleId = new Types.ObjectId(role._id);
      newEmployee.role.permissionSuite = role.permissionSuite;
      newEmployee.role.roleName = role.roleName;
    } else {
      const role = await this.roleService.findOneInCompany('Default', createEmployeeDto.companyId);
      newEmployee.role.roleId = role._id;
      newEmployee.role.permissionSuite = role.permissionSuite;
    }

    if (createEmployeeDto.hourlyRate) {
      newEmployee.hourlyRate = createEmployeeDto.hourlyRate;
    } else {
      const role = await this.roleService.findById(newEmployee.role.roleId);
      newEmployee.hourlyRate = role.hourlyRate;
    }

    return (await this.employeeRepository.save(newEmployee)).toObject();
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
    const employees: any = await this.employeeRepository.DetailedFindAllInCompany(companyId, ['userId']);

    return employees;
  }

  async findById(id: Types.ObjectId) {
    const data = await this.employeeRepository.findById(id);
    return data;
  }

  async detailedFindById(id: Types.ObjectId) {
    console.log('In detailedFindById, id: ', id);
    const employee: any = await this.employeeRepository.DetailedFindById(id, ['userId']);
    console.log('employee: ', employee);
    return employee;
  }

  async employeeExists(id: Types.ObjectId): Promise<boolean> {
    return await this.employeeRepository.employeeExists(id);
  }

  async employeeExistsForCompany(id: Types.ObjectId, companyId: Types.ObjectId): Promise<boolean> {
    //checking if the company exists
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    return await this.employeeRepository.employeeExistsForCompany(id, companyId);
  }

  async update(employeeId: Types.ObjectId, updateEmployeeDto: UpdateEmployeeDto) {
    console.log('updateEmployeeDto: ', updateEmployeeDto);
    const validation = await this.validateUpdateEmployee(updateEmployeeDto);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }

    //Checking if the superior is being updated
    if (updateEmployeeDto.superiorId) {
      await this.updateSuperior(employeeId, updateEmployeeDto.superiorId);
    }

    //Altering the dto to update the role if roleId is given
    const dto = new InternalUpdateEmployeeDto();
    if (updateEmployeeDto.roleId) {
      dto.role = new roleObject();
      dto.role.roleId = updateEmployeeDto.roleId;
      const role = await this.roleService.findById(dto.role.roleId);
      dto.role.permissionSuite = role.permissionSuite;
      dto.role.roleName = role.roleName;
    }

    if (updateEmployeeDto.hourlyRate) {
      dto.hourlyRate = updateEmployeeDto.hourlyRate;
    }
    console.log('dto: ', dto);
    return await this.employeeRepository.update(employeeId, dto);
  }

  async internalUpdate(employeeId: Types.ObjectId, updateEmployeeDto: InternalUpdateEmployeeDto) {
    return await this.employeeRepository.update(employeeId, updateEmployeeDto);
  }

  async addSubordinates(employeeId: Types.ObjectId, addSubordinatesDto: AddSubordinatesDto) {
    //checking that the current employee's superior is not is the newSubordinate list
    const currentEmployee = await this.findById(employeeId);
    if (!currentEmployee) {
      throw new Exception('Update subordinates could not be done');
    }
    if (addSubordinatesDto.subordinatesToBeAdded.includes(currentEmployee.superiorId)) {
      throw new Exception('Cannot make the persons current superior a subordinate');
    }
    //Checking that the owner is not in the list of newSubordinates
    const owner = await this.findAllInCompanyWithRoleName(currentEmployee.companyId, 'Owner');
    if (addSubordinatesDto.subordinatesToBeAdded.includes(owner[0]._id)) {
      throw new Exception('Cannot make the owner a subordinate');
    }

    const newSubordinates = currentEmployee.subordinates;

    //updating the superior of the new subordinates
    for (const newSubId of addSubordinatesDto.subordinatesToBeAdded) {
      if (!currentEmployee.subordinates.includes(newSubId)) {
        newSubordinates.push(newSubId);
        //These are new subordinates.
        //Removing the newSub from their current superior
        const newSub = await this.findById(newSubId);
        const superior = await this.findById(newSub.superiorId);
        let newSubordinatesTemp = superior.subordinates;
        newSubordinatesTemp = newSubordinatesTemp.filter((ids) => ids.toString() !== newSubId.toString());
        await this.employeeRepository.updateSubordinates(superior._id, newSubordinatesTemp);
        //Updating the superior of newSub
        await this.employeeRepository.updateSuperior(newSubId, employeeId);
      }
    }
    //updating the current employees subordinate list
    return await this.employeeRepository.updateSubordinates(employeeId, newSubordinates);
  }

  async removeSubordinates(employeeId: Types.ObjectId, removeSubordinatesDto: RemoveSubordinatesDto) {
    console.log('employeeId: ', employeeId);
    console.log('removeSubordinatesDto: ', removeSubordinatesDto);
    const currentEmployee = await this.findById(employeeId);
    let newSubordinates = currentEmployee.subordinates;
    //checking to see if the any of the current subordinates are being removed
    for (const subId of removeSubordinatesDto.subordinatesToBeRemoved) {
      console.log('subId: ', subId);
      if (currentEmployee.subordinates.map((ids) => ids.toString()).includes(subId.toString())) {
        console.log('In if');
        newSubordinates = newSubordinates.filter((ids) => ids.toString() !== subId.toString()); //Removing the subId from the list of subordinates

        //updating the superior of the removed subordinate to be the owner of the company
        const subEmployee = await this.findById(subId);
        const owner = await this.findAllInCompanyWithRoleName(subEmployee.companyId, 'Owner');
        let updateDto = new InternalUpdateEmployeeDto();
        updateDto.superiorId = owner[0]._id;

        await this.employeeRepository.update(subId, updateDto);

        //Adding the removed subordinate to the owner's list of subordinates
        const ownerEmployee = await this.findById(owner[0]._id);
        updateDto = new InternalUpdateEmployeeDto();
        updateDto.subordinates = ownerEmployee.subordinates;
        updateDto.subordinates.push(subId);
        await this.employeeRepository.update(owner[0]._id, updateDto);
      }
    }

    //updating the current employees subordinate list
    return await this.employeeRepository.updateSubordinates(employeeId, newSubordinates);
  }

  async updateSubordinates(employeeId: Types.ObjectId, newSubordinates: Types.ObjectId[]) {
    //checking that the current employee's superior is not is the newSubordinate list
    const currentEmployee = await this.findById(employeeId);
    const currentSuperior = await this.findById(currentEmployee.superiorId);
    if (!currentEmployee || !currentSuperior) {
      throw new Exception('Update subordinates could not be done');
    }
    if (newSubordinates.includes(currentEmployee.superiorId)) {
      throw new Exception('Cannot make the persons current superior a subordinate');
    }
    //Checking that the owner is not in the list of newSubordinates
    const owner = await this.findAllInCompanyWithRoleName(currentEmployee.companyId, 'Owner');
    if (newSubordinates.includes(owner[0]._id)) {
      throw new Exception('Cannot make the persons current superior a subordinate');
    }

    //checking to see if the any of the current subordinates are being removed
    for (const currSub of currentEmployee.subordinates) {
      if (!newSubordinates.includes(currSub)) {
        //A subordinate is being removed from the list. They will be given the current employees superior as a superior
        //Updating the currentSuperior's subordinate list
        const newSubordinatesLoop = currentSuperior.subordinates;
        newSubordinatesLoop.push(currSub);
        await this.employeeRepository.updateSubordinates(currentSuperior._id, newSubordinatesLoop);
        //removing currSub from their superiors list of subordinates
        const currSubEmployee = await this.findById(currSub);
        const currSubSuperior = await this.findById(currSubEmployee.superiorId);
        const newSubordinatesTemp = currSubSuperior.subordinates;
        newSubordinatesTemp.filter((ids) => !ids.toString().match(currSub.toString()));
        await this.employeeRepository.updateSubordinates(currSubEmployee.superiorId, newSubordinatesTemp);
        //Updating the current subordinate's superior
        await this.employeeRepository.updateSuperior(currSub, currentEmployee.superiorId);
      }
    }

    //updating the superior of the new subordinates
    for (const newSub of newSubordinates) {
      if (!currentEmployee.subordinates.includes(newSub)) {
        //These are new subordinates.
        //Removing the newSub from their current superior
        const subEmployee = await this.findById(newSub);
        const subCurrSup = await this.findById(subEmployee.superiorId);
        const newSubordinatesTemp = subCurrSup.subordinates;
        newSubordinatesTemp.filter((ids) => ids.toString() !== newSub.toString());
        await this.employeeRepository.updateSubordinates(subEmployee.superiorId, newSubordinatesTemp);
        //Updating the superior of newSub
        await this.employeeRepository.updateSuperior(newSub, employeeId);
      }
    }
    //updating the current employees subordinate list
    return await this.employeeRepository.updateSubordinates(employeeId, newSubordinates);
  }

  async updateSuperior(employeeId: Types.ObjectId, newSuperiorId: Types.ObjectId) {
    //checking that the new superior is not in the tree below the current employee
    const currentEmployee = await this.findById(employeeId);
    const currentSuperior = await this.findById(currentEmployee.superiorId);
    const newSuperior = await this.findById(newSuperiorId);

    if (!currentEmployee || !currentSuperior || !newSuperior) {
      throw new Exception('Could not update superior');
    }
    const listBelow = await this.deptFirstTraversalId(employeeId);

    if (listBelow.length !== 0 && listBelow.includes(newSuperiorId)) {
      throw new Exception('Cannot make the a person below the current employee a superior of the employee');
    }

    //Updating the subordinate list of the employee's current superior
    let newSubordinates = currentSuperior.subordinates;
    newSubordinates = newSubordinates.filter((ids) => ids.toString() !== employeeId.toString());
    await this.employeeRepository.updateSubordinates(currentSuperior._id, newSubordinates);

    //Updating the subordinate list of the employees new superior
    newSubordinates = newSuperior.subordinates;
    newSubordinates.push(employeeId);
    await this.employeeRepository.updateSubordinates(newSuperior._id, newSubordinates);

    //Updating the current employees superior
    return await this.employeeRepository.updateSuperior(employeeId, newSuperiorId);
  }

  async updateUserInfo(id: Types.ObjectId, userInfo: UpdateEmployeeUserInfoDto) {
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

  async updateRole(roleId: Types.ObjectId, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleService.findById(roleId);

    if (updateRoleDto.hourlyRate) {
      await this.employeeRepository.updateHourlyRate(
        roleId,
        new Types.ObjectId(role.companyId),
        updateRoleDto.hourlyRate,
        role.hourlyRate,
      );
    }

    const newRole = new roleObject();
    if (roleId) {
      newRole.roleId = new Types.ObjectId(roleId);
    }
    if (updateRoleDto.permissionSuite) {
      newRole.permissionSuite = updateRoleDto.permissionSuite;
    } else {
      newRole.permissionSuite = role.permissionSuite;
    }

    if (updateRoleDto.roleName) {
      newRole.roleName = updateRoleDto.roleName;
    } else {
      newRole.roleName = role.roleName;
    }
    return await this.employeeRepository.updateRole(
      new Types.ObjectId(roleId),
      new Types.ObjectId(role.companyId),
      newRole,
    );
  }

  async allEmployeesInCompanyWithRole(roleId: Types.ObjectId) {
    return await this.employeeRepository.allEmployeesInCompanyWithRole(roleId);
  }

  async removeEmployeeReferences(employeeId: Types.ObjectId) {
    const currentEmployee = await this.findById(employeeId);
    const listOfEmployees = await this.employeeRepository.findAllInCompanyWithEmployee(employeeId);

    for (const employee of listOfEmployees) {
      if (employee.superiorId == employeeId) {
        await this.updateSuperior(employee._id, currentEmployee.superiorId);
      } else {
        const dto = new RemoveSubordinatesDto();
        dto.subordinatesToBeRemoved = [employee._id];
        await this.removeSubordinates(employee.superiorId, dto);
      }
    }
  }

  async removeTeamReferences(teamId: Types.ObjectId) {
    await this.employeeRepository.removeAllReferencesToTeam(teamId);
  }

  async removeRoleReferences(roleId: Types.ObjectId) {
    const listOfEmployees = await this.allEmployeesInCompanyWithRole(roleId);
    const workerRole = await this.roleService.findOneInCompany('Worker', listOfEmployees[0].companyId);

    for (const employee of listOfEmployees) {
      const dto = new InternalUpdateEmployeeDto();
      dto.role.roleId = workerRole._id;
      await this.employeeRepository.update(employee._id, dto);
    }
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    const employee = await this.findById(id);
    if (!employee) {
      throw new Error('Employee does not exist');
    }
    //Removing the employee from any teams they are part of
    await this.teamService.removeEmployeeReferences(id);

    //Removing the employee from any job assignments they are part of
    await this.jobService.removeAllReferencesToEmployee(id);

    //Removing the employee from the user entity
    await this.usersService.removeJoinedCompanyWithoutValidation(employee.userId, employee.companyId);

    //Updating the tree structure
    await this.removeEmployeeReferences(id);

    await this.stockMovementsService.removeEmployeeRef(id);

    return await this.employeeRepository.remove(id);
  }

  async removeUnderMe(userId: Types.ObjectId, id: Types.ObjectId, currentEmployeeId: Types.ObjectId): Promise<boolean> {
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

  async findByIdsInternalForJobs(ids: Types.ObjectId[]) {
    // It is being used for jobs, due to type errors
    return await this.employeeRepository.findByIds(ids);
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
    const listOfEmployees = await this.findAllInCompany(currentEmployee.companyId);

    //checking if the employee exists
    if (!(await this.employeeExists(employeeId))) {
      // throw new Error('Employee does not exist');
    }

    //Removing the current employee from the list
    const index = listOfEmployees.findIndex((employee) => employee._id.equals(currentEmployee._id));
    if (index !== -1) {
      listOfEmployees.splice(index, 1);
    }

    // Remove the superior from the list if it exists
    // if (currentEmployee.superiorId) {
    //   const index = listOfEmployees.findIndex((employee) => employee._id.equals(currentEmployee.superiorId));
    //   if (index !== -1) {
    //     listOfEmployees.splice(index, 1);
    //   }
    // }

    // Remove subordinates from the list if they exist
    if (currentEmployee.subordinates && currentEmployee.subordinates.length > 0) {
      currentEmployee.subordinates.forEach((subordinateId) => {
        const index = listOfEmployees.findIndex((employee) => employee._id.equals(subordinateId));
        if (index !== -1) {
          listOfEmployees.splice(index, 1);
        }
      });
    }

    return listOfEmployees;
  }

  async listPotentialSubordinates(employeeId: Types.ObjectId) {
    const currentEmployee = await this.findById(employeeId);
    const listOfEmployees = await this.findAllInCompany(currentEmployee.companyId);
    const owner = await this.findAllInCompanyWithRoleName(currentEmployee.companyId, 'Owner');

    //Removing the current employee from the list
    let index = listOfEmployees.findIndex((employee) => employee._id.toString() === currentEmployee._id.toString());
    if (index !== -1) {
      listOfEmployees.splice(index, 1);
    }

    //removing the owner from the list
    index = listOfEmployees.findIndex((employee) => employee._id.toString() === owner[0]._id.toString());
    if (index !== -1) {
      listOfEmployees.splice(index, 1);
    }

    //removing the current employees superior from the list
    index = listOfEmployees.findIndex((employee) => employee._id.toString() === currentEmployee.superiorId.toString());
    if (index !== -1) {
      listOfEmployees.splice(index, 1);
    }

    return listOfEmployees;
  }

  async listPotentialSuperiors(employeeId: Types.ObjectId) {
    const currentEmployee = await this.findById(employeeId);
    const listOfEmployees = await this.findAllInCompany(currentEmployee.companyId);

    //Removing the current employee from the list
    let index = listOfEmployees.findIndex((employee) => employee._id.toString() === currentEmployee._id.toString());
    if (index !== -1) {
      listOfEmployees.splice(index, 1);
    }

    //Removing everyone below the current employee from the list
    const listBelow = await this.deptFirstTraversalId(employeeId);
    for (const tempEmployeeId of listBelow) {
      index = listOfEmployees.findIndex((employee) => employee._id.toString() === tempEmployeeId.toString());
      if (index !== -1) {
        listOfEmployees.splice(index, 1);
      }
    }

    return listOfEmployees;
  }

  async deptFirstTraversalId(id: Types.ObjectId) {
    const currentEmployee = await this.findById(id);
    const listOfEmployees = await this.findAllInCompany(currentEmployee.companyId);
    const employeeList: Types.ObjectId[] = [];
    const open: Types.ObjectId[] = [];
    const closed: Types.ObjectId[] = [];
    employeeList.push(id);
    open.push(...currentEmployee.subordinates);
    closed.push(currentEmployee._id);

    while (open.length !== 0) {
      const currentId = open.shift();
      const currentEmployee = listOfEmployees.find((employee) => employee._id.equals(currentId));
      employeeList.push(currentEmployee._id);
      open.push(...currentEmployee.subordinates);
      closed.push(currentId);
    }
    return employeeList;
  }

  async deptFirstTraversalObjects(id: Types.ObjectId) {
    const currentEmployee = await this.findById(id);
    const listOfEmployees = await this.findAllInCompany(currentEmployee.companyId);
    const employeeList: Employee[] = [];
    const open: Types.ObjectId[] = [];
    const closed: Types.ObjectId[] = [];
    employeeList.push(currentEmployee);
    open.push(...currentEmployee.subordinates);
    closed.push(currentEmployee._id);

    while (open.length !== 0) {
      const currentId = open.shift();
      const currentEmployee = listOfEmployees.find((employee) => employee._id.equals(currentId));
      employeeList.push(currentEmployee);
      open.push(...currentEmployee.subordinates);
      closed.push(currentId);
    }
    return employeeList;
  }

  async deptFirstTraversalDetailed(id: Types.ObjectId) {
    const currentEmployee = await this.findById(id);
    const listOfEmployees = await this.detailedFindAllInCompany(currentEmployee.companyId);
    const employeeList: Employee[] = [];
    const open: Types.ObjectId[] = [];
    const closed: Types.ObjectId[] = [];
    employeeList.push(currentEmployee);
    open.push(...currentEmployee.subordinates);
    closed.push(currentEmployee._id);

    while (open.length !== 0) {
      const currentId = open.shift();
      const currentEmployee = listOfEmployees.find((employee) => employee._id.equals(currentId));
      employeeList.push(currentEmployee);
      open.push(...currentEmployee.subordinates);
      closed.push(currentId);
    }
    return employeeList;
  }

  async isBelowMe(currentEmployeeId: Types.ObjectId, otherEmployeeId: Types.ObjectId) {
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
      throw new Error('Employee id for given userId and companyId could not be found');
    }
  }

  async findBelowMeInCompany(currentEmployeeId: Types.ObjectId) {
    try {
      return await this.deptFirstTraversalObjects(currentEmployeeId);
    } catch (error) {
      throw new Error('Employee id for given userId and companyId could not be found');
    }
  }

  async findIdsBelowMeInCompany(currentEmployeeId: Types.ObjectId) {
    try {
      return await this.deptFirstTraversalId(currentEmployeeId);
    } catch (error) {
      throw new Error('Employee id for given userId and companyId could not be found');
    }
  }

  async detailedFindByIdUnderMe(employeeId: Types.ObjectId, currentEmployeeId: Types.ObjectId) {
    if (await this.isBelowMe(currentEmployeeId, employeeId)) {
      return await this.detailedFindById(currentEmployeeId);
    } else {
      throw new Error('Employee not below the requesting employee');
    }
  }

  async findByIdUnderMe(employeeId: Types.ObjectId, currentEmployeeId: Types.ObjectId) {
    if (await this.isBelowMe(currentEmployeeId, employeeId)) {
      return await this.findById(employeeId);
    } else {
      throw new Error('Employee not below the requesting employee');
    }
  }

  async findAllInCompanyWithRoleId(companyId: Types.ObjectId, roleId: Types.ObjectId) {
    // console.log('In findAllInCompanyWithRole');
    // console.log('companyId: ', companyId);
    // console.log('roleId: ', roleId);
    return await this.employeeRepository.findAllInCompanyWithRoleId(companyId, roleId);
  }

  async findAllInCompanyWithRoleName(companyId: Types.ObjectId, name: string) {
    // console.log('In findAllInCompanyWithRole');
    // console.log('companyId: ', companyId);
    // console.log('name: ', name);
    return await this.employeeRepository.findAllInCompanyWithRoleName(companyId, name);
  }

  // async roleUpdate(roleId: Types.ObjectId, companyId: Types.ObjectId) {
  //   //finding all employees in a company
  //   const list = await this.findAllInCompanyWithRole(companyId, roleId);
  //   //updating the role for all employees
  //   list.forEach(async (employee) => {
  //     await this.update(employee._id, { roleId: roleId });
  //   });
  // }

  async graphData(companyId: Types.ObjectId) {
    // console.log('graphData');
    //Setting up for the traversal
    const owner = await this.findAllInCompanyWithRoleName(companyId, 'Owner');
    let currentCount: number = 1;
    let subCount: number = 2;
    let edgeCount: number = 1;
    const nodes: Nodes = {};
    const edges: Edges = {};
    // console.log('owner: ', owner);
    const currentEmployee = await this.findById(owner[0]._id);
    // console.log('owner Id: ', owner[0]._id);
    const open: Types.ObjectId[] = [];

    //Adding the owner to the nodes
    const nodeLabel = 'node' + currentCount.toString();
    // console.log('nodeLabel: ', nodeLabel);
    nodes[nodeLabel] = {
      name: currentEmployee.userInfo.displayName,
      id: currentEmployee._id,
      face: currentEmployee.userInfo.displayImage,
    };
    //Adding the owner to the edges
    currentEmployee.subordinates.forEach(() => {
      const edgeLabel = 'edge' + edgeCount.toString();
      // console.log('edgeLabel: ', edgeLabel);
      edges[edgeLabel] = { source: nodeLabel, target: 'node' + subCount.toString() };
      edgeCount++;
      subCount++;
    });
    //Add the subordinates to the back of the open list
    // console.log('currentEmployee.subordinates: ', currentEmployee.subordinates);
    open.push(...currentEmployee.subordinates);
    currentCount++;

    while (open.length !== 0) {
      const currentId = open.shift();
      // console.log('currentId: ', currentId);
      const currentEmployee = await this.findById(currentId);
      // console.log('currentEmployee: ', currentEmployee);

      //Adding the currentEmployee to the nodes
      const nodeLabel = 'node' + currentCount.toString();
      // console.log('nodeLabel: ', nodeLabel);
      nodes[nodeLabel] = {
        name: currentEmployee.userInfo.displayName,
        id: currentEmployee._id,
        face: currentEmployee.userInfo.displayImage,
      };
      //Adding the currentEmployee to the edges
      currentEmployee.subordinates.forEach(() => {
        const edgeLabel = 'edge' + edgeCount.toString();
        // console.log('edgeLabel: ', edgeLabel);
        edges[edgeLabel] = { source: nodeLabel, target: 'node' + subCount.toString() };
        edgeCount++;
        subCount++;
      });
      //Add the subordinates to the back of the open list
      // console.log('currentEmployee.subordinates: ', currentEmployee.subordinates);
      open.push(...currentEmployee.subordinates);
      currentCount++;
    }

    return { nodes: nodes, edges: edges };
  }
}

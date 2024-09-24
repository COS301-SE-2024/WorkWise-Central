import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto, BulkUpdateRoleDto } from './dto/update-role.dto';
import { Types } from 'mongoose';
import { Role } from './entity/role.entity';
import { CompanyService } from '../company/company.service';
// import { EmployeeService } from '../employee/employee.service';
import { RoleRepository } from './role.repository';
import { ValidationResult } from '../auth/entities/validationResult.entity';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class RoleService {
  private permissionsArray: string[] = [];

  constructor(
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
    @Inject(forwardRef(() => CompanyService))
    private companyService: CompanyService,
    @Inject(forwardRef(() => RoleRepository))
    private roleRepository: RoleRepository,
  ) {
    this.permissionsArray.push('view all employees');
    this.permissionsArray.push('view employees under me');
    this.permissionsArray.push('edit employees');
    this.permissionsArray.push('add new employees');
    this.permissionsArray.push('delete employees');
    this.permissionsArray.push('view all jobs');
    this.permissionsArray.push('view jobs under me');
    this.permissionsArray.push('view jobs assigned to me');
    this.permissionsArray.push('edit jobs');
    this.permissionsArray.push('add new jobs');
    this.permissionsArray.push('delete jobs');
    this.permissionsArray.push('record inventory use');
    this.permissionsArray.push('record job details');
    this.permissionsArray.push('view all clients');
    this.permissionsArray.push('view clients under me');
    this.permissionsArray.push('view clients that are assigned to me');
    this.permissionsArray.push('edit clients');
    this.permissionsArray.push('add new clients');
    this.permissionsArray.push('delete clients');
    this.permissionsArray.push('view all inventory');
    this.permissionsArray.push('edit all inventory');
    this.permissionsArray.push('add new inventory item');
    this.permissionsArray.push('delete inventory item');
    this.permissionsArray.push('record stock take');
    this.permissionsArray.push('view movements');
    this.permissionsArray.push('company settings');
    this.permissionsArray.push('company requests');
    this.permissionsArray.push('view statistics');
    this.permissionsArray.push('view customer feedback');
    this.permissionsArray.push('view teams');
    this.permissionsArray.push('edit teams');
    this.permissionsArray.push('delete teams');
    this.permissionsArray.push('view invoices');
    this.permissionsArray.push('edit invoices');
    this.permissionsArray.push('delete invoices');
    this.permissionsArray.push('generate invoices');
    this.permissionsArray.push('view fleet');
  }

  async validateCreateRole(role: CreateRoleDto) {
    //Check if the permissions are valid
    for (const permission of role.permissionSuite) {
      if (!this.permissionsArray.includes(permission.toString())) {
        return new ValidationResult(false, `Invalid permission`);
      }
    }

    //Check if the company exists
    if (!(await this.companyService.companyIdExists(role.companyId))) {
      return new ValidationResult(false, `Company not found`);
    }

    //Check if the role already exists
    try {
      if (await this.findOneInCompany(role.roleName, role.companyId)) {
        return new ValidationResult(false, `Role already exists`);
      }
    } catch (error) {}
    return new ValidationResult(true, `All good`);
  }

  async validateUpdateRole(roleId: Types.ObjectId, updateRoleDto: UpdateRoleDto) {
    const roleToBeUpdate = await this.findById(roleId);
    if (!roleToBeUpdate) {
      return new ValidationResult(false, `Role to be updated not found`);
    }
    //Check if the permissions are valid
    if (updateRoleDto.permissionSuite) {
      for (const permission of updateRoleDto.permissionSuite) {
        if (!this.permissionsArray.some((item) => item.replace(/\s+/g, '') === permission.replace(/\s+/g, ''))) {
          return new ValidationResult(false, `Invalid permission`);
        }
      }
    }

    //Check if the role already exists
    try {
      if (await this.findOneInCompany(updateRoleDto.roleName, roleToBeUpdate.companyId)) {
        return new ValidationResult(false, `Role already exists`);
      }
    } catch (error) {}
    //Checking that the role is not Worker or owner
    if (roleToBeUpdate.roleName === 'Owner' || roleToBeUpdate.roleName === 'Worker') {
      return new ValidationResult(false, `Not allowed to edit this role`);
    }

    return new ValidationResult(true, `All good`);
  }

  async create(createRoleDto: CreateRoleDto) {
    const validation = await this.validateCreateRole(createRoleDto);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }

    const newRole = new Role(createRoleDto);
    newRole.roleName = createRoleDto.roleName;
    newRole.companyId = createRoleDto.companyId;
    newRole.permissionSuite = createRoleDto.permissionSuite;
    newRole.hourlyRate = createRoleDto.hourlyRate;

    return await this.roleRepository.save(newRole);
  }

  async internalCreate(createRoleDto: CreateRoleDto) {
    const newRole = new Role(createRoleDto);
    newRole.roleName = createRoleDto.roleName;
    newRole.companyId = createRoleDto.companyId;
    newRole.permissionSuite = createRoleDto.permissionSuite;
    newRole.hourlyRate = createRoleDto.hourlyRate;

    return await this.roleRepository.save(newRole);
  }

  async findAll() {
    return this.roleRepository.findAll();
  }

  getPermissionsArray(): string[] {
    return this.permissionsArray;
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    //checking if the company exists
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    const roles = (await this.roleRepository.findAllInCompany(companyId)) as unknown as Role[];
    return roles;
  }

  async findAllInCompanyForEditing(companyId: Types.ObjectId) {
    //checking if the company exists
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    const roles = await this.roleRepository.findAllInCompany(companyId);
    const result = [];
    //Remove owner role and Worker role
    roles.forEach((role) => {
      if (role.roleName !== 'Owner' && role.roleName !== 'Worker') {
        result.push(role);
      }
    });
    return result;
  }

  async findOneInCompany(name: string, companyId: Types.ObjectId) {
    //checking if the company exists
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    const result = await this.roleRepository.findByIdInCompany(name, companyId);
    return result;
  }

  async findById(identifier: Types.ObjectId) {
    const result = await this.roleRepository.findById(identifier);
    return result;
  }

  async update(roleId: Types.ObjectId, updateRoleDto: UpdateRoleDto) {
    const validation = await this.validateUpdateRole(roleId, updateRoleDto);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    //Updating all the employees in the company with the new role
    await this.employeeService.updateRole(roleId, updateRoleDto);

    return this.roleRepository.update(roleId, updateRoleDto);
  }

  async bulkUpdate(bulkUpdateRoleDto: BulkUpdateRoleDto[], companyId: Types.ObjectId) {
    //Checking that the roles exist for the given company
    const roles = await this.roleRepository.findAllInCompany(companyId);
    for (let i = 0; i < bulkUpdateRoleDto.length; i++) {
      const role = roles.find((role) => role._id.toString() === bulkUpdateRoleDto[i].roleId.toString());
      if (!role) {
        throw new Error('Role does not exist');
      }
    }

    const response = [];

    //Doing the updates
    for (let i = 0; i < bulkUpdateRoleDto.length; i++) {
      response.push(await this.roleRepository.update(bulkUpdateRoleDto[i].roleId, bulkUpdateRoleDto[i].updateRoleDto));
    }
    return response;
  }

  async roleExists(id: Types.ObjectId): Promise<boolean> {
    return await this.roleRepository.roleExists(id);
  }

  async roleExistsInCompany(id: Types.ObjectId, companyId: Types.ObjectId): Promise<boolean> {
    //checking if the company exists
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    return await this.roleRepository.roleExistsInCompany(id, companyId);
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    //Checking if the role exists
    const role = await this.findById(id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    //Checking that the role is not Owner or Worker
    if (role.roleName === 'Owner' || role.roleName === 'Worker') {
      throw new Error('Not allowed to remove this role');
    }

    //Removing the role from all the employees
    await this.employeeService.removeRoleReferences(id);

    return this.roleRepository.remove(id);
  }

  async createDefaultRoles(companyId: Types.ObjectId) {
    // Owner role
    const ownerRoleDto = new CreateRoleDto();
    ownerRoleDto.companyId = companyId;
    ownerRoleDto.roleName = 'Owner';
    ownerRoleDto.permissionSuite = this.permissionsArray; //Full permissions

    await this.internalCreate(ownerRoleDto);

    // Admin role
    const adminRoleDto = new CreateRoleDto();
    adminRoleDto.companyId = companyId;
    adminRoleDto.roleName = 'Admin';
    adminRoleDto.permissionSuite.push('view all employees');
    adminRoleDto.permissionSuite.push('edit employees');
    adminRoleDto.permissionSuite.push('add new employees');
    adminRoleDto.permissionSuite.push('delete employees');
    adminRoleDto.permissionSuite.push('view all jobs');
    adminRoleDto.permissionSuite.push('edit jobs');
    adminRoleDto.permissionSuite.push('add new jobs');
    adminRoleDto.permissionSuite.push('delete jobs');
    adminRoleDto.permissionSuite.push('view all clients');
    adminRoleDto.permissionSuite.push('edit clients');
    adminRoleDto.permissionSuite.push('add new clients');
    adminRoleDto.permissionSuite.push('delete clients');
    adminRoleDto.permissionSuite.push('view all inventory');
    adminRoleDto.permissionSuite.push('record job details');
    adminRoleDto.permissionSuite.push('company settings');

    await this.internalCreate(adminRoleDto);

    // Foreman
    const foremanRoleDto = new CreateRoleDto();
    foremanRoleDto.companyId = companyId;
    foremanRoleDto.roleName = 'Foreman';
    foremanRoleDto.permissionSuite.push('view employees under me');
    foremanRoleDto.permissionSuite.push('edit employees');
    foremanRoleDto.permissionSuite.push('view jobs under me');
    foremanRoleDto.permissionSuite.push('edit jobs');
    foremanRoleDto.permissionSuite.push('add new jobs');
    foremanRoleDto.permissionSuite.push('view clients under me');
    foremanRoleDto.permissionSuite.push('edit clients');
    foremanRoleDto.permissionSuite.push('add new clients');
    foremanRoleDto.permissionSuite.push('view all inventory');
    foremanRoleDto.permissionSuite.push('record job details');
    await this.internalCreate(foremanRoleDto);

    // Team Leader
    const teamRoleDto = new CreateRoleDto();
    teamRoleDto.companyId = companyId;
    teamRoleDto.roleName = 'Team leader';

    teamRoleDto.permissionSuite.push('view employees under me');
    teamRoleDto.permissionSuite.push('view jobs under me');
    teamRoleDto.permissionSuite.push('view jobs assigned to me');
    teamRoleDto.permissionSuite.push('view clients under me');
    teamRoleDto.permissionSuite.push('view clients that are assigned to me');
    teamRoleDto.permissionSuite.push('record job details');

    await this.internalCreate(teamRoleDto);

    // Inventory manager
    const inventoryRoleDto = new CreateRoleDto();
    inventoryRoleDto.companyId = companyId;
    inventoryRoleDto.roleName = 'Inventory manager';

    inventoryRoleDto.permissionSuite.push('view all inventory');
    inventoryRoleDto.permissionSuite.push('edit all inventory');
    inventoryRoleDto.permissionSuite.push('delete inventory item');
    inventoryRoleDto.permissionSuite.push('add new inventory item');
    inventoryRoleDto.permissionSuite.push('record inventory use');
    inventoryRoleDto.permissionSuite.push('record stock take');

    await this.internalCreate(inventoryRoleDto);

    // Worker
    const workerRoleDto = new CreateRoleDto();
    workerRoleDto.companyId = companyId;
    workerRoleDto.roleName = 'Worker';
    workerRoleDto.permissionSuite.push('view jobs assigned to me');
    workerRoleDto.permissionSuite.push('view clients that are assigned to me');
    workerRoleDto.permissionSuite.push('record job details');

    await this.internalCreate(workerRoleDto);
  }

  deleteAllInCompany(companyId: Types.ObjectId) {
    this.roleRepository.deleteAllInCompany(companyId);
  }
}

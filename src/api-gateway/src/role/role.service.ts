import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    this.permissionsArray.push('edit all employees');
    this.permissionsArray.push('edit employees under me');
    this.permissionsArray.push('add new employees');
    this.permissionsArray.push('remove any employees');
    this.permissionsArray.push('remove employees under me');
    this.permissionsArray.push('view all jobs');
    this.permissionsArray.push('view jobs under me');
    this.permissionsArray.push('view jobs assigned to me');
    this.permissionsArray.push('edit all jobs');
    this.permissionsArray.push('edit jobs that are under me');
    this.permissionsArray.push('edit jobs that are assigned to me');
    this.permissionsArray.push('add a new job');
    this.permissionsArray.push('remove any job');
    this.permissionsArray.push('remove job under me');
    this.permissionsArray.push('remove job assigned to me');
    this.permissionsArray.push('view all clients');
    this.permissionsArray.push('view clients under me');
    this.permissionsArray.push('view clients that are assigned to me');
    this.permissionsArray.push('edit all clients');
    this.permissionsArray.push('edit clients that are under me');
    this.permissionsArray.push('edit clients that are assigned to me');
    this.permissionsArray.push('add a new clients');
    this.permissionsArray.push('remove any clients');
    this.permissionsArray.push('remove clients under me');
    this.permissionsArray.push('remove clients assigned to me');
    this.permissionsArray.push('view all inventory');
    this.permissionsArray.push('edit all inventory');
    this.permissionsArray.push('add new inventory item');
    this.permissionsArray.push('delete inventory item');
    this.permissionsArray.push('record inventory use');
    this.permissionsArray.push('record job details');
    this.permissionsArray.push('company settings');
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

  async validateUpdateRole(
    userId: Types.ObjectId,
    roleId: Types.ObjectId,
    updateRoleDto: UpdateRoleDto,
  ) {
    //Getting the company id from the role
    const roleToBeUpdate = await this.findById(roleId);
    const companyId = roleToBeUpdate.companyId;
    const requestingEmployeeId =
      await this.employeeService.getRequestingEmployeeFromCompanyId(
        companyId,
        userId,
      );
    //checking that the requesting employee's companyId is equal to the companyId of the role being update
    if (requestingEmployeeId === null) {
      return new ValidationResult(false, `CompanyId does not match`);
    }

    const requestingEmployee =
      await this.employeeService.findById(requestingEmployeeId);

    //Checking that the requesting employee has appropriate permission
    if (
      !(await this.hasPermission('company settings', requestingEmployee.roleId))
    ) {
      return new ValidationResult(false, `Invalid permission`);
    }

    //Check if the permissions are valid
    for (const permission of updateRoleDto.permissionSuite) {
      if (!this.permissionsArray.includes(permission.toString())) {
        return new ValidationResult(false, `Invalid permission`);
      }
    }

    //Check if the role already exists
    try {
      if (await this.findOneInCompany(updateRoleDto.roleName, companyId)) {
        return new ValidationResult(false, `Role already exists`);
      }
    } catch (error) {}

    //Checking that the role is not Default or owner
    if (
      roleToBeUpdate.roleName === 'Owner' ||
      roleToBeUpdate.roleName === 'Default'
    ) {
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
    const roles = await this.roleRepository.findAllInCompany(companyId);
    let result;
    //Remove owner role and default role
    roles.forEach((role) => {
      if (role.roleName !== 'Owner' && role.roleName !== 'Default') {
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
    if (name !== 'Owner' && name !== 'Default') {
      const result = await this.roleRepository.findByIdInCompany(
        name,
        companyId,
      );
      return result;
    }
    return null;
  }

  async findById(identifier: Types.ObjectId) {
    const result = await this.roleRepository.findById(identifier);
    if (result.roleName !== 'Owner' && result.roleName !== 'Default') {
      return result;
    }
    return null;
  }

  async update(
    userId: Types.ObjectId,
    roleId: Types.ObjectId,
    updateRoleDto: UpdateRoleDto,
  ) {
    const validation = await this.validateUpdateRole(
      userId,
      roleId,
      updateRoleDto,
    );
    if (!validation.isValid) {
      throw new Error(validation.message);
    }

    return this.roleRepository.update(roleId, updateRoleDto);
  }

  async bulkUpdate(
    userId: Types.ObjectId,
    bulkUpdateRoleDto: BulkUpdateRoleDto,
  ) {
    //Doing the updates
    for (let i = 0; i < bulkUpdateRoleDto.ids.length; i++) {
      const id = bulkUpdateRoleDto.ids[i];
      const updateRoleDto = bulkUpdateRoleDto.roleUpdates[i];
      await this.update(userId, id, updateRoleDto);
    }
  }

  async roleExists(id: Types.ObjectId): Promise<boolean> {
    return await this.roleRepository.roleExists(id);
  }

  async hasPermission(permission: string, id: Types.ObjectId) {
    //checking if the role exists
    if (!(await this.roleExists(id))) {
      throw new Error('role not found');
    }
    const role = await this.findById(id);
    if (role.permissionSuite.includes(permission)) {
      return true;
    }
    return false;
  }

  async roleExistsInCompany(
    id: Types.ObjectId,
    companyId: Types.ObjectId,
  ): Promise<boolean> {
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
    //Checking that the role is not Owner or Default
    if (role.roleName === 'Owner' || role.roleName === 'Default') {
      throw new Error('Not allowed to remove this role');
    }
    return this.roleRepository.remove(id);
  }

  async createDefaultRoles(companyId: Types.ObjectId) {
    // Owner role
    const ownerRoleDto = new CreateRoleDto();
    ownerRoleDto.companyId = companyId;
    ownerRoleDto.roleName = 'Owner';
    ownerRoleDto.permissionSuite = this.permissionsArray; //Full permissions

    await this.create(ownerRoleDto);

    // Admin role
    const adminRoleDto = new CreateRoleDto();
    adminRoleDto.companyId = companyId;
    adminRoleDto.roleName = 'Admin';
    adminRoleDto.permissionSuite.push('view all employees');
    adminRoleDto.permissionSuite.push('edit all employees');
    adminRoleDto.permissionSuite.push('add new employees');
    adminRoleDto.permissionSuite.push('remove any employees');
    adminRoleDto.permissionSuite.push('view all jobs');
    adminRoleDto.permissionSuite.push('edit all jobs');
    adminRoleDto.permissionSuite.push('add a new job');
    adminRoleDto.permissionSuite.push('remove any job');
    adminRoleDto.permissionSuite.push('view all clients');
    adminRoleDto.permissionSuite.push('edit all clients');
    adminRoleDto.permissionSuite.push('add a new clients');
    adminRoleDto.permissionSuite.push('remove any clients');
    adminRoleDto.permissionSuite.push('company settings');

    let newRole = await this.create(adminRoleDto);
    await this.roleRepository.save(newRole);

    // Foreman
    const foremanRoleDto = new CreateRoleDto();
    foremanRoleDto.companyId = companyId;
    foremanRoleDto.roleName = 'Foreman';
    foremanRoleDto.permissionSuite.push('view employees under me');
    foremanRoleDto.permissionSuite.push('edit employees under me');
    foremanRoleDto.permissionSuite.push('remove employees under me');
    foremanRoleDto.permissionSuite.push('view jobs under me');
    foremanRoleDto.permissionSuite.push('view jobs assigned to me');
    foremanRoleDto.permissionSuite.push('edit jobs that are under me');
    foremanRoleDto.permissionSuite.push('edit jobs that are assigned to me');
    foremanRoleDto.permissionSuite.push('remove job under me');
    foremanRoleDto.permissionSuite.push('remove job assigned to me');
    foremanRoleDto.permissionSuite.push('view clients under me');
    foremanRoleDto.permissionSuite.push('view clients that are assigned to me');
    foremanRoleDto.permissionSuite.push('edit clients that are under me');
    foremanRoleDto.permissionSuite.push('edit clients that are assigned to me');
    foremanRoleDto.permissionSuite.push('remove clients under me');
    foremanRoleDto.permissionSuite.push('remove clients assigned to me');
    foremanRoleDto.permissionSuite.push('record job details');

    newRole = await this.create(foremanRoleDto);
    await this.roleRepository.save(newRole);

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

    newRole = await this.create(teamRoleDto);
    await this.roleRepository.save(newRole);

    // Inventory manager
    const inventoryRoleDto = new CreateRoleDto();
    inventoryRoleDto.companyId = companyId;
    inventoryRoleDto.roleName = 'Inventory manager';
    inventoryRoleDto.permissionSuite.push('view all inventory');
    inventoryRoleDto.permissionSuite.push('edit all inventory');
    inventoryRoleDto.permissionSuite.push('delete inventory item');
    inventoryRoleDto.permissionSuite.push('add new inventory item');
    inventoryRoleDto.permissionSuite.push('record inventory use');

    newRole = await this.create(inventoryRoleDto);
    await this.roleRepository.save(newRole);

    // Worker
    const workerRoleDto = new CreateRoleDto();
    workerRoleDto.companyId = companyId;
    workerRoleDto.roleName = 'Worker';
    workerRoleDto.permissionSuite.push('view jobs assigned to me');
    workerRoleDto.permissionSuite.push('view clients that are assigned to me');
    workerRoleDto.permissionSuite.push('record job details');

    newRole = await this.create(workerRoleDto);
    await this.roleRepository.save(newRole);

    // Default role
    const defaultRoleDto = new CreateRoleDto();
    defaultRoleDto.companyId = companyId;
    defaultRoleDto.roleName = 'Default';
    defaultRoleDto.permissionSuite.push('view jobs assigned to me');
    defaultRoleDto.permissionSuite.push('view clients that are assigned to me');
    defaultRoleDto.permissionSuite.push('record job details');

    newRole = await this.create(defaultRoleDto);
    await this.roleRepository.save(newRole);
  }
}

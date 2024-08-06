import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Types } from 'mongoose';
import { Role } from './entity/role.entity';
import { CompanyService } from '../company/company.service';
// import { EmployeeService } from '../employee/employee.service';
import { RoleRepository } from './role.repository';
import { ValidationResult } from '../auth/entities/validationResult.entity';

@Injectable()
export class RoleService {
  private permissionsArray: string[] = [];

  constructor(
    // @Inject(forwardRef(() => EmployeeService))
    // private employeeService: EmployeeService,
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
    this.permissionsArray.push('view all jobs');
    this.permissionsArray.push('view all jobs under me');
    this.permissionsArray.push('view all jobs assigned to me');
    this.permissionsArray.push('edit all jobs');
    this.permissionsArray.push('edit jobs that are under me');
    this.permissionsArray.push('edit jobs that are assigned to me');
    this.permissionsArray.push('add a new job');
    this.permissionsArray.push('view all clients');
    this.permissionsArray.push('view all clients under me');
    this.permissionsArray.push('view all clients that are assigned to me');
    this.permissionsArray.push('edit all clients');
    this.permissionsArray.push('edit all clients that are under me');
    this.permissionsArray.push('edit all clients that are assigned to me');
    this.permissionsArray.push('view all inventory');
    this.permissionsArray.push('edit all inventory');
    this.permissionsArray.push('add a new inventory item');
    this.permissionsArray.push('record inventory use');
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

  async validateUpdateRole(roleId: Types.ObjectId, role: UpdateRoleDto) {
    //Check if the permissions are valid
    for (const permission of role.permissionSuite) {
      if (!this.permissionsArray.includes(permission.toString())) {
        return new ValidationResult(false, `Invalid permission`);
      }
    }

    //Getting the company id from the role
    const roleObj = await this.findById(roleId);
    const companyId = roleObj.companyId;

    //Check if the role already exists
    try {
      if (await this.findOneInCompany(role.roleName, companyId)) {
        return new ValidationResult(false, `Role already exists`);
      }
    } catch (error) {}
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
    const result = await this.roleRepository.findAllInCompany(companyId);
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

  async update(id: Types.ObjectId, updateRoleDto: UpdateRoleDto) {
    const validation = await this.validateUpdateRole(id, updateRoleDto);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }

    return this.roleRepository.update(id, updateRoleDto);
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
    if (!(await this.roleExists(id))) {
      throw new NotFoundException('Role not found');
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
    adminRoleDto.permissionSuite.push('view employees under me');
    adminRoleDto.permissionSuite.push('edit all employees');
    adminRoleDto.permissionSuite.push('edit employees under me');
    adminRoleDto.permissionSuite.push('view all jobs');
    adminRoleDto.permissionSuite.push('view all jobs under me');
    adminRoleDto.permissionSuite.push('view all jobs assigned to me');
    adminRoleDto.permissionSuite.push('edit all jobs');
    adminRoleDto.permissionSuite.push('edit jobs that are under me');
    adminRoleDto.permissionSuite.push('edit jobs that are assigned to me');
    adminRoleDto.permissionSuite.push('add a new job');
    adminRoleDto.permissionSuite.push('view all clients');
    adminRoleDto.permissionSuite.push('view all clients under me');
    adminRoleDto.permissionSuite.push('view all clients that are assigned to me');
    adminRoleDto.permissionSuite.push('edit all clients');
    adminRoleDto.permissionSuite.push('edit all clients that are under me');
    adminRoleDto.permissionSuite.push('edit all clients that are assigned to me');
    adminRoleDto.permissionSuite.push('view all inventory');
    adminRoleDto.permissionSuite.push('record inventory use');

    let newRole = await this.create(adminRoleDto);
    await this.roleRepository.save(newRole);

    // Foreman
    const foremanRoleDto = new CreateRoleDto();
    foremanRoleDto.companyId = companyId;
    foremanRoleDto.roleName = 'Foreman';
    adminRoleDto.permissionSuite.push('view all employees under me');
    foremanRoleDto.permissionSuite.push('view all jobs under me');
    foremanRoleDto.permissionSuite.push('view all jobs assigned to me');
    foremanRoleDto.permissionSuite.push('edit all jobs');
    foremanRoleDto.permissionSuite.push('edit jobs that are under me');
    foremanRoleDto.permissionSuite.push('edit jobs that are assigned to me');
    foremanRoleDto.permissionSuite.push('add a new job');
    foremanRoleDto.permissionSuite.push('view all clients under me');
    foremanRoleDto.permissionSuite.push('view all clients that are assigned to me');
    foremanRoleDto.permissionSuite.push('edit all clients that are under me');
    foremanRoleDto.permissionSuite.push('edit all clients that are assigned to me');
    foremanRoleDto.permissionSuite.push('view all inventory');
    foremanRoleDto.permissionSuite.push('record inventory use');

    newRole = await this.create(foremanRoleDto);
    await this.roleRepository.save(newRole);

    // Team Leader
    const teamRoleDto = new CreateRoleDto();
    teamRoleDto.companyId = companyId;
    teamRoleDto.roleName = 'Team leader';
    teamRoleDto.permissionSuite.push('edit all employees');
    teamRoleDto.permissionSuite.push('view all jobs assigned to me');
    teamRoleDto.permissionSuite.push('edit all jobs');
    teamRoleDto.permissionSuite.push('edit jobs that are assigned to me');
    teamRoleDto.permissionSuite.push('view all clients');
    teamRoleDto.permissionSuite.push('view all clients that are assigned to me');
    teamRoleDto.permissionSuite.push('edit all clients');
    teamRoleDto.permissionSuite.push('edit all clients that are assigned to me');
    teamRoleDto.permissionSuite.push('view all inventory');
    teamRoleDto.permissionSuite.push('record inventory use');

    newRole = await this.create(teamRoleDto);
    await this.roleRepository.save(newRole);

    // Inventory manager
    const inventoryRoleDto = new CreateRoleDto();
    inventoryRoleDto.companyId = companyId;
    inventoryRoleDto.roleName = 'Inventory manager';
    inventoryRoleDto.permissionSuite.push('view all inventory');
    inventoryRoleDto.permissionSuite.push('edit all inventory');
    inventoryRoleDto.permissionSuite.push('add a new inventory item');
    inventoryRoleDto.permissionSuite.push('record inventory use');

    newRole = await this.create(inventoryRoleDto);
    await this.roleRepository.save(newRole);

    // Worker
    const workerRoleDto = new CreateRoleDto();
    workerRoleDto.companyId = companyId;
    workerRoleDto.roleName = 'Worker';
    workerRoleDto.permissionSuite.push('view all jobs assigned to me');
    workerRoleDto.permissionSuite.push('edit jobs that are assigned to me');
    workerRoleDto.permissionSuite.push('view all clients that are assigned to me');
    workerRoleDto.permissionSuite.push('edit all clients');
    workerRoleDto.permissionSuite.push('edit all clients that are under me');
    workerRoleDto.permissionSuite.push('edit all clients that are assigned to me');
    workerRoleDto.permissionSuite.push('view all inventory');
    workerRoleDto.permissionSuite.push('record inventory use');

    newRole = await this.create(workerRoleDto);
    await this.roleRepository.save(newRole);
  }
}

import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import { Role } from './entity/role.entity';
import { CompanyService } from '../company/company.service';
import { EmployeeService } from '../employee/employee.service';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  private permissionsArray: string[] = [];

  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
    @Inject(forwardRef(() => CompanyService))
    private companyService: CompanyService,
    @Inject(forwardRef(() => RoleRepository))
    private roleRepository: RoleRepository,
  ) {
    this.permissionsArray.push('view all employees');
    this.permissionsArray.push('edit employees');
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

  async validateRole(role: Role | CreateRoleDto | UpdateRoleDto) {
    if ('permissionSuite' in role && role.permissionSuite) {
      for (const permission of role.permissionSuite) {
        if (!this.permissionsArray.includes(permission.toString())) {
          throw new ConflictException('Invalid permission');
        }
      }
    }
    if ('companyId' in role && role.companyId) {
      if (!(await this.companyService.companyIdExists(role.companyId))) {
        throw new ConflictException('Company not found');
      }
      if ('roleName' in role && role.roleName) {
        if (
          await this.findOneInCompany(role.roleName, role.companyId.toString())
        ) {
          throw new ConflictException('Role already exists');
        }
      }
    }
    if ('roleId' in role && role.roleId) {
      if (!(await this.roleExists(role.roleId.toString()))) {
        throw new ConflictException('Role not found');
      }
    }
  }

  async create(createRoleDto: CreateRoleDto) {
    try {
      await this.validateRole(createRoleDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    const newRole = new Role(createRoleDto);
    newRole.roleName = createRoleDto.roleName;
    newRole.companyId = createRoleDto.companyId;
    newRole.permissionSuite = createRoleDto.permissionSuite;

    const model = new this.roleModel(newRole);
    return await model.save();
  }

  async findAll() {
    return this.roleRepository.findAll();
  }

  getPermissionsArray(): string[] {
    return this.permissionsArray;
  }

  async findAllInCompany(companyId: string) {
    return this.roleRepository.findAllInCompany(companyId);
  }

  async findOneInCompany(name: string, companyId: string) {
    const result = await this.roleModel.findOne({
      roleName: name,
      companyId: companyId,
    });
    if (result == null) {
      throw new NotFoundException('Role not found');
    }
    return result;
  }

  async findById(
    identifier: string | Types.ObjectId,
  ): Promise<FlattenMaps<Role> & { _id: Types.ObjectId }> {
    const result = await this.roleRepository.findById(identifier);
    if (result == null) {
      throw new NotFoundException('Role not found');
    }
    return result;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      await this.validateRole(updateRoleDto);
    } catch (error) {
      return `${error}`;
    }
    return this.roleRepository.update(id, updateRoleDto);
  }

  async roleExists(id: string): Promise<boolean> {
    return await this.roleRepository.roleExists(id);
  }

  async roleExistsInCompany(id: string, companyId: string): Promise<boolean> {
    return await this.roleRepository.roleExistsInCompany(id, companyId);
  }

  async remove(id: string): Promise<boolean> {
    return this.roleRepository.remove(id);
  }
}

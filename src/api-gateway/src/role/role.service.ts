import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types, FlattenMaps } from 'mongoose';
import { Role } from './entity/role.entity';
import { CompanyService } from '../company/company.service';
import { User } from '../users/entities/user.entity';
import { validate } from 'class-validator';

@Injectable()
export class RoleService {
  private permissionsArray: string[] = [];

  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
    @Inject(forwardRef(() => CompanyService))
    private companyService: CompanyService,
  ) {
    this.permissionsArray.push("view all employees")
    this.permissionsArray.push("edit employees")
    this.permissionsArray.push("add new employees")
    this.permissionsArray.push("view all jobs")
    this.permissionsArray.push("view all jobs under me")
    this.permissionsArray.push("view all jobs assigned to me")
    this.permissionsArray.push("edit all jobs")
    this.permissionsArray.push("edit jobs that are under me")
    this.permissionsArray.push("edit jobs that are assigned to me")
    this.permissionsArray.push("add a new job")
    this.permissionsArray.push("view all clients")
    this.permissionsArray.push("view all clients under me")
    this.permissionsArray.push("view all clients that are assigned to me")
    this.permissionsArray.push("edit all clients")
    this.permissionsArray.push("edit all clients that are under me")
    this.permissionsArray.push("edit all clients that are assigned to me")
    this.permissionsArray.push("view all inventory")
    this.permissionsArray.push("edit all inventory")
    this.permissionsArray.push("add a new inventory item")
    this.permissionsArray.push("record inventory use")
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
      if (!(await this.companyService.companyExists(role.companyId.toString()))) {
        throw new ConflictException('Company not found');
      }
      if ('roleName' in role && role.roleName) {
        if (await this.findOneInCompany(role.roleName, role.companyId.toString())) {
          throw new ConflictException('Role already exists');
        }
      }
    }
    if('roleId' in role && role.roleId){
      if(!(await this.roleExists(role.roleId.toString()))){
        throw new ConflictException('Role not found');
      }
    }
  }

  async create(createRoleDto: CreateRoleDto) {
    try {
      await this.validateRole(createRoleDto)
    }
    catch (error) { 
      return `${error}`;
    }
    
    const newRole = new Role(createRoleDto);
    newRole.roleName = createRoleDto.roleName;
    newRole.companyId = createRoleDto.companyId;
    newRole.permissionSuite = createRoleDto.permissionSuite;

    const model = new this.roleModel(newRole);
    const result = await model.save();
    return `${result}`;
  }

  async findAll() {
    try {
      return this.roleModel.find().exec();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Roles could not be retrieved');
    }
  }

  async findAllInCompany(companyId: string) {
    try {
    const filter = companyId ? { companyId: companyId } : {};
    return await this.roleModel.find(filter).exec();
  } catch (error) {
    console.log(error);
    throw new ServiceUnavailableException('Roles could not be retrieved');
  }
  }

  async findOne(id: string) {
    return this.roleModel.findById(id);
  }

  async findOneInCompany(name: string, companyId: string) {
    return this.roleModel.findOne({ roleName: name, companyId: companyId });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      await this.validateRole(updateRoleDto)
    }
    catch (error) { 
      return `${error}`;
    }

    const previousObject: FlattenMaps<Role> & { _id: Types.ObjectId } =
      await this.roleModel
        .findOneAndUpdate(
          {
            $and: [
              { _id: id },
              {
                $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
              },
            ],
          },
          { $set: { ...updateRoleDto }, updatedAt: new Date() },
          { new: true }
        )
        .lean();

    return previousObject;
  }

  async roleExists(id: string): Promise<boolean> {
    const result: FlattenMaps<Role> & { _id: Types.ObjectId } =
      await this.roleModel
        .findOne({
          $and: [
            { _id: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();
    return result != null;
  }

  async roleExistsInCompany(id: string, companyId: string): Promise<boolean> {
    const result: FlattenMaps<Role> & { _id: Types.ObjectId } =
      await this.roleModel
        .findOne({
          $and: [
            { _id: id },            
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();
    if (result != null && result.companyId.toString() == companyId) 
      return true;

    return false;

  }

  async findById(
    identifier: string | Types.ObjectId,
  ): Promise<FlattenMaps<Role> & { _id: Types.ObjectId }> {
    const result: FlattenMaps<Role> & { _id: Types.ObjectId } =
      await this.roleModel
        .findOne({
          $and: [
            { _id: identifier },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();

    if (result == null) {
      throw new NotFoundException('Role not found');
    }

    return result;
  }

  async remove(id: string): Promise<boolean> {
    const RoleToDelete = await this.findOne(id);
    const result: Document<unknown, NonNullable<unknown>, User> &
      User & { _id: Types.ObjectId } =
      await this.roleModel.findOneAndUpdate(
        {
          $and: [
            { _id: RoleToDelete._id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        { $set: { deletedAt: new Date() } },
      );

    if (result == null) {
      throw new InternalServerErrorException('Internal server Error');
    }
    return true;
  }
}

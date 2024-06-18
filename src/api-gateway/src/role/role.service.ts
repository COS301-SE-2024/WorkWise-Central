import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types, FlattenMaps } from 'mongoose';
import { Role } from './entity/role.entity';
import { CompanyService } from '../company/company.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
    @Inject(forwardRef(() => CompanyService))
    private companyService: CompanyService,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    if (!(await this.companyService.companyIdExists(createRoleDto.companyId))) {
      throw new ConflictException('User not found');
    }

    const company = await this.companyService.findById(createRoleDto.companyId,);
    if (!company) {
      throw new ConflictException('Invalid ID given');
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

  async findOne(id: string) {
    return this.roleModel.findById(id);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const addPermission = updateRoleDto.addPermission;
    const removePermission = updateRoleDto.removePermission;
    const roleName = updateRoleDto.roleName;

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
        )
        .lean();
    
    if (addPermission) {
      await this.roleModel.updateOne(
        { _id: id },
        { $addToSet: { permissionSuite: { $each: addPermission } } }
      );
    }
    if (removePermission) {
      await this.roleModel.updateOne(
        { _id: id },
        { $pull: { permissionSuite: { $in: removePermission } } }
      );
    }
    if (roleName) {
      await this.roleModel.updateOne(
        { _id: id },
        { $set: { roleName: roleName } }
      );
    }
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

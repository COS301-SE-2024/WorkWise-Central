import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FlattenMaps, Model, Types } from 'mongoose';
import { Role } from './entity/role.entity';
import { UpdateRoleDto } from './dto/update-role.dto';
import { User } from '../users/entities/user.entity';
@Injectable()
export class RoleRepository {
  constructor(@InjectModel(Role.name) private readonly roleModel: Model<Role>) {}

  async findAll() {
    return this.roleModel.find().find().lean().exec();
  }

  async save(company: Role) {
    const newCompanyModel = new this.roleModel(company);
    return await newCompanyModel.save();
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    const filter = companyId ? { companyId: companyId } : {};
    return await this.roleModel.find(filter).find().lean().exec();
  }

  async findById(identifier: string | Types.ObjectId) {
    const result: FlattenMaps<Role> & { _id: Types.ObjectId } = await this.roleModel
      .findOne({
        $and: [
          { _id: identifier },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
    return result;
  }

  async findByIdInCompany(identifier: string, companyIdentifier: Types.ObjectId) {
    const result: FlattenMaps<Role> & { _id: Types.ObjectId } = await this.roleModel
      .findOne({
        $and: [
          { roleName: identifier },
          {
            companyId: companyIdentifier,
          },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
    return result;
  }

  async update(id: Types.ObjectId, updateRoleDto: UpdateRoleDto) {
    const previousObject: FlattenMaps<Role> & { _id: Types.ObjectId } = await this.roleModel
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
        { new: true },
      )
      .lean();

    return previousObject;
  }

  async roleExists(id: Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<Role> & { _id: Types.ObjectId } = await this.roleModel
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

  async roleExistsInCompany(id: Types.ObjectId, companyId: Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<Role> & { _id: Types.ObjectId } = await this.roleModel
      .findOne({
        $and: [
          { _id: id },
          { companyId: companyId },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
    return result != null;
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    const RoleToDelete = await this.findById(id);
    const result: Document<unknown, NonNullable<unknown>, User> & User & { _id: Types.ObjectId } =
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
      return false;
    }
    return true;
  }
}

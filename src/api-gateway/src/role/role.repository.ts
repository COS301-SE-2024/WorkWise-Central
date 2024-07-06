import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FlattenMaps, Model, Types } from 'mongoose';
import { Role } from './entity/role.entity';
import { UpdateRoleDto } from './dto/update-role.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}

  async findAll() {
    return this.roleModel.find().exec();
  }

  async findAllInCompany(companyId: string) {
    const filter = companyId ? { companyId: companyId } : {};
    return await this.roleModel.find(filter).exec();
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
    return result;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
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
          { new: true },
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
    if (result != null && result.companyId.toString() == companyId) return true;

    return false;
  }

  async remove(id: string): Promise<boolean> {
    const RoleToDelete = await this.findById(id);
    const result: Document<unknown, NonNullable<unknown>, User> &
      User & { _id: Types.ObjectId } = await this.roleModel.findOneAndUpdate(
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

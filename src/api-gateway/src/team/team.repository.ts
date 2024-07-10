import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FlattenMaps, Model, Types } from 'mongoose';
import { Team } from './entities/team.entity';
import { UpdateTeamDto } from './dto/update-team.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TeamRepository {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
  ) {}

  async findAll() {
    return this.teamModel.find().exec();
  }

  async findById(
    identifier: string | Types.ObjectId,
  ): Promise<FlattenMaps<Team> & { _id: Types.ObjectId }> {
    const result: FlattenMaps<Team> & { _id: Types.ObjectId } =
      await this.teamModel
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

  async teamExists(id: Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<Team> & { _id: Types.ObjectId } =
      await this.teamModel
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

  async teamExistsInCompany(
    id: Types.ObjectId,
    companyId: Types.ObjectId,
  ): Promise<boolean> {
    const result: FlattenMaps<Team> & { _id: Types.ObjectId } =
      await this.teamModel
        .findOne({
          $and: [
            { _id: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();

    if (result != null && result.companyId == companyId) {
      return true;
    }
    return false;
  }

  async update(id: Types.ObjectId, updateTeamDto: UpdateTeamDto) {
    const previousObject: FlattenMaps<Team> & { _id: Types.ObjectId } =
      await this.teamModel
        .findOneAndUpdate(
          {
            $and: [
              { _id: id },
              {
                $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
              },
            ],
          },
          { $set: { ...updateTeamDto }, updatedAt: new Date() },
        )
        .lean();
    return previousObject;
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    const TeamToDelete = await this.findById(id);

    const result: Document<unknown, NonNullable<unknown>, User> &
      User & { _id: Types.ObjectId } = await this.teamModel.findOneAndUpdate(
      {
        $and: [
          { _id: TeamToDelete._id },
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

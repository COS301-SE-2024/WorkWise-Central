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

  async save(team: Team) {
    const newTeamModel = new this.teamModel(team);
    return await newTeamModel.save();
  }

  async findById(identifier: Types.ObjectId) {
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

  async findByIdInCompany(
    identifier: Types.ObjectId,
    companyIdentification: Types.ObjectId,
  ) {
    const result: FlattenMaps<Team> & { _id: Types.ObjectId } =
      await this.teamModel
        .findOne({
          $and: [
            { _id: identifier },
            { companyId: companyIdentification },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();

    return result;
  }

  async findByNameInCompany(
    name: string,
    companyIdentification: Types.ObjectId,
  ) {
    const result: FlattenMaps<Team> & { _id: Types.ObjectId } =
      await this.teamModel
        .findOne({
          $and: [
            { teamName: name },
            { companyId: companyIdentification },
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
    companyIdentification: Types.ObjectId,
  ): Promise<boolean> {
    const result = this.findByIdInCompany(id, companyIdentification);
    return result != null;
  }

  async teamNameExistsInCompany(
    name: string,
    companyIdentification: Types.ObjectId,
  ): Promise<boolean> {
    const result = this.findByNameInCompany(name, companyIdentification);
    return result != null;
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

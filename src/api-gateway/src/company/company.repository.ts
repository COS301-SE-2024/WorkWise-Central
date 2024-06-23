import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FlattenMaps, Model, Types } from 'mongoose';
import { Company } from './entities/company.entity';
import { User } from '../users/entities/user.entity';
import { Job } from '../job/entities/job.entity';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
  ) {}

  async findById(
    identifier: string | Types.ObjectId,
  ): Promise<FlattenMaps<Company> & { _id: Types.ObjectId }> {
    return this.companyModel
      .findOne({
        $and: [
          { _id: identifier },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
  }

  async findByRegistrationNumber(
    registrationNumber: string,
  ): Promise<FlattenMaps<Company> & { _id: Types.ObjectId }> {
    return this.companyModel
      .findOne({
        $and: [
          { registrationNumber: registrationNumber },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
  }

  async findByEmailOrName(identifier: string) {
    const regex = `*${identifier}*`;
    const searchTerm = new RegExp(regex, 'i');

    return this.companyModel
      .find({
        $and: [
          {
            $or: [{ private: false }, { private: { $exists: false } }],
          },
          {
            $or: [
              { name: { $regex: searchTerm } },
              { 'contactDetails.email': { $regex: searchTerm } },
            ],
          },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
  }

  async findAll() {
    return this.companyModel.find().lean().exec();
  }

  async registrationNumberExists(id: string): Promise<boolean> {
    const result: FlattenMaps<User> & { _id: Types.ObjectId } =
      await this.companyModel
        .findOne({
          $and: [
            { registrationNumber: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();

    return result == null;
  }

  async idExists(id: Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<User> & { _id: Types.ObjectId } =
      await this.companyModel
        .findOne({
          $and: [
            { _id: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();
    return result == null;
  }

  async update(
    id: string | Types.ObjectId,
    updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyModel.findOneAndUpdate(
      {
        $and: [
          { _id: id },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      },
      { $set: { ...updateCompanyDto }, updatedAt: new Date() },
      { new: true },
    );
  }

  async delete(id: string): Promise<boolean> {
    const result: Document<unknown, NonNullable<unknown>, Job> &
      Job & { _id: Types.ObjectId } = await this.companyModel.findOneAndUpdate(
      {
        $and: [
          { _id: id },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      },
      { $set: { deletedAt: new Date() } },
    );

    return result != null;
  }
}

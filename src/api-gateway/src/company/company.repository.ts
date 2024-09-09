import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import { AccountDetails, Address, Company } from './entities/company.entity';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { currentDate } from '../utils/Utils';
import { isNotDeleted } from '../shared/soft-delete';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,

    /*    @InjectModel(JobStatus.name)
    private jobStatusModel: Model<JobStatus>,*/
  ) {}

  async save(company: Company) {
    const newCompanyModel = new this.companyModel(company);
    return await newCompanyModel.save();
  }

  async findById(identifier: Types.ObjectId, populatedFields?: string[]) {
    if (populatedFields) {
      return this.companyModel
        .findOne({
          $and: [{ _id: identifier }, { $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }] }],
        })
        .populate(populatedFields)
        .lean()
        .exec();
    }

    return this.companyModel
      .findOne({
        $and: [{ _id: identifier }, { $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }] }],
      })
      .lean()
      .exec();
  }

  async findByRegistrationNumber(registrationNumber: string): Promise<FlattenMaps<Company> & { _id: Types.ObjectId }> {
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
    const regex = `${identifier}`;
    return this.companyModel
      .find({
        $and: [
          {
            $or: [{ private: false }, { private: { $exists: false } }],
          },
          {
            $or: [
              { name: { $regex: regex, $options: 'i' } },
              { 'contactDetails.email': { $regex: regex, $options: 'i' } },
            ],
          },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
  }

  async findAll(fields?: string[]) {
    if (fields) {
      return this.companyModel
        .find({ $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }] })
        .populate(fields)
        .lean();
    }

    return this.companyModel.find({ $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }] }).lean();
  }

  async registrationNumberExists(registrationNumber: string): Promise<boolean> {
    const result = await this.companyModel
      .findOne({
        $and: [
          { registrationNumber: registrationNumber },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();

    return result != null;
  }

  async VatNumberExists(vatNumber: string): Promise<boolean> {
    const result = await this.companyModel
      .findOne({
        $and: [
          { vatNumber: vatNumber },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();

    return result != null;
  }

  async idExists(id: Types.ObjectId): Promise<boolean> {
    const result = await this.companyModel
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

  async update(id: Types.ObjectId, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyModel.findOne({
      $and: [
        { _id: id },
        {
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        },
      ],
    });

    if (updateCompanyDto.registrationNumber) {
      company.registrationNumber = updateCompanyDto.registrationNumber;
      company.markModified('registrationNumber');
    }
    if (updateCompanyDto.vatNumber) {
      company.vatNumber = updateCompanyDto.vatNumber;
      company.markModified('vatNumber');
    }
    if (updateCompanyDto.name) {
      company.name = updateCompanyDto.name;
      company.markModified('name');
    }
    if (updateCompanyDto.type) {
      company.type = updateCompanyDto.type;
      company.markModified('type');
    }
    if (updateCompanyDto.logo) {
      company.logo = updateCompanyDto.logo;
      company.markModified('logo');
    }
    if (updateCompanyDto.contactDetails) {
      company.contactDetails = { ...company.contactDetails, ...updateCompanyDto.contactDetails };
      company.markModified('contactDetails');
    }
    if (updateCompanyDto.address) {
      const updatedAddress: Address = { ...company.address, ...updateCompanyDto.address };
      console.log(updatedAddress);
      company.address = updatedAddress;
      company.markModified('address');
    }
    if (updateCompanyDto.accountDetails) {
      const updatedAccDetails: AccountDetails = { ...company.accountDetails, ...updateCompanyDto.accountDetails };
      console.log(updatedAccDetails);
      company.accountDetails = updatedAccDetails;
      company.markModified('accountDetails');
    }

    if (updateCompanyDto.private) {
      company.private = updateCompanyDto.private;
      company.markModified('private');
    }
    company.updatedAt = currentDate();
    return (await company.save()).toObject();
  }

  async delete(id: Types.ObjectId): Promise<boolean> {
    const result = await this.companyModel.findOneAndUpdate(
      {
        $and: [
          { _id: id },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      },
      { $set: { deletedAt: currentDate() } },
    );

    return result != null;
  }

  async findAllNames() {
    const filter = {
      $and: [
        { $or: [{ private: false }, { private: { $exists: false } }] },
        { $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }] },
      ],
    };
    return await this.companyModel
      .find(filter)
      .select([
        '_id',
        'registrationNumber',
        'vatNumber',
        'name',
        'logo',
        'address.city',
        'address.province',
        'address.suburb',
        'address.street',
        'address.postalCode',
      ])
      .lean()
      .exec();
  }

  // I want a function that will return the company name of a company with a given id
  async findCompanyNameById(id: Types.ObjectId): Promise<string> {
    const comp = await this.companyModel
      .findOne({
        $and: [{ _id: id }, isNotDeleted],
      })
      .select('name')
      .lean()
      .exec();
    return comp.name;
  }

  async updateStatuses(
    companyId: Types.ObjectId,
    jobStatuses: Types.ObjectId[],
  ): Promise<FlattenMaps<Company> & { _id: Types.ObjectId }> {
    return this.companyModel
      .findOneAndUpdate(
        { $and: [{ _id: companyId }, isNotDeleted] },
        { $set: { jobStatuses: jobStatuses } },
        { new: true },
      )
      .lean()
      .exec();
  }

  async findAllStatusesInCompany(companyId: Types.ObjectId) {
    return this.companyModel
      .findOne({
        $and: [{ _id: companyId }, isNotDeleted],
      })
      .select(['jobStatuses'])
      .populate('jobStatuses')
      .lean()
      .exec();
  }

  async addJobStatus(companyId: Types.ObjectId, statusId: Types.ObjectId) {
    return this.companyModel.findOneAndUpdate(
      {
        $and: [{ _id: companyId }, isNotDeleted],
      },
      { $push: { jobStatuses: statusId } },
    );
  }

  async addJobStatuses(companyId: Types.ObjectId, statusIds: Types.ObjectId[]) {
    return this.companyModel.findOneAndUpdate(
      {
        $and: [{ _id: companyId }, isNotDeleted],
      },
      { $push: { jobStatuses: { $each: statusIds } } },
    );
  }

  eradicateCompany(companyId: Types.ObjectId) {
    return this.companyModel
      .deleteOne({
        _id: companyId,
      })
      .exec();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FlattenMaps, Model, Types } from 'mongoose';
import { Employee } from './entities/employee.entity';
import {
  UpdateEmployeeDto,
  UpdateEmployeeUserInfoDto,
} from './dto/update-employee.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
  ) {}

  async findAll() {
    return this.employeeModel.find().lean().exec();
  }

  async save(company: Employee) {
    const newCompanyModel = new this.employeeModel(company);
    return await newCompanyModel.save();
  }

  async findAllInCompany(identifier: Types.ObjectId) {
    const result: (FlattenMaps<Employee> & { _id: Types.ObjectId })[] =
      await this.employeeModel
        .find({
          $and: [
            {
              companyId: identifier,
            },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();

    return result;
  }

  async findAllInCompanyWithRole(
    identifier: Types.ObjectId,
    roleId: Types.ObjectId,
  ) {
    const result: (FlattenMaps<Employee> & { _id: Types.ObjectId })[] =
      await this.employeeModel
        .find({
          $and: [
            {
              companyId: identifier,
            },
            {
              roleId: roleId,
            },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();

    return result;
  }

  async DetailedFindAllInCompany(
    identifier: Types.ObjectId,
    fieldsToPouplate: string[],
  ) {
    const result: (FlattenMaps<Employee> & { _id: Types.ObjectId })[] =
      await this.employeeModel
        .find({
          $and: [
            {
              companyId: identifier,
            },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .populate(fieldsToPouplate)
        .lean();

    return result;
  }

  async findById(identifier: Types.ObjectId) {
    return this.employeeModel
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

  async DetailedFindById(
    identifier: Types.ObjectId,
    fieldsToPouplate: string[],
  ) {
    return this.employeeModel
      .findOne({
        $and: [
          { _id: identifier },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .populate(fieldsToPouplate)
      .lean();
  }

  async findByIds(identifiers: Types.ObjectId[]) {
    const ids = identifiers.map((id) => new Types.ObjectId(id));

    const result: (FlattenMaps<Employee> & { _id: Types.ObjectId })[] =
      await this.employeeModel
        .find({
          $and: [
            { _id: { $in: ids } },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();
    return result;
  }

  async employeeExists(id: Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<Employee> & { _id: Types.ObjectId } =
      await this.employeeModel
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

  async employeeExistsForCompany(
    id: Types.ObjectId,
    companyIdentification: Types.ObjectId,
  ): Promise<boolean> {
    const result: FlattenMaps<Employee> & { _id: Types.ObjectId } =
      await this.employeeModel
        .findOne({
          $and: [
            { _id: new Types.ObjectId(id) },
            { companyId: companyIdentification },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();
    return result != null;
  }

  async getCompanyIdFromEmployee(employeeId: Types.ObjectId) {
    const result = await this.employeeModel
      .findOne(
        { _id: new Types.ObjectId(employeeId) },
        { companyId: 1, _id: 0 },
      )
      .lean();

    return result ? result.companyId : null;
  }

  async update(id: Types.ObjectId, updateEmployeeDto: UpdateEmployeeDto) {
    const previousObject: FlattenMaps<Employee> & { _id: Types.ObjectId } =
      await this.employeeModel
        .findOneAndUpdate(
          {
            $and: [
              { _id: id },
              {
                $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
              },
            ],
          },
          { $set: { ...updateEmployeeDto }, updatedAt: new Date() },
        )
        .lean();

    return previousObject;
  }

  async updateSuperior(
    id: Types.ObjectId,
    superiorIdentifcation: Types.ObjectId,
  ) {
    const previousObject: FlattenMaps<Employee> & { _id: Types.ObjectId } =
      await this.employeeModel
        .findOneAndUpdate(
          {
            $and: [
              { _id: id },
              {
                $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
              },
            ],
          },
          {
            $set: { superiorId: superiorIdentifcation },
            updatedAt: new Date(),
          },
        )
        .lean();

    return previousObject;
  }

  async updateSubordinates(
    id: Types.ObjectId,
    subordinatesIdentification: Types.ObjectId[],
  ) {
    const previousObject: FlattenMaps<Employee> & { _id: Types.ObjectId } =
      await this.employeeModel
        .findOneAndUpdate(
          {
            $and: [
              { _id: id },
              {
                $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
              },
            ],
          },
          {
            $set: { subordinates: subordinatesIdentification },
            updatedAt: new Date(),
          },
        )
        .lean();

    return previousObject;
  }

  async updateUserInfo(
    id: Types.ObjectId,
    userInfo: UpdateEmployeeUserInfoDto,
  ) {
    const previousObject: FlattenMaps<Employee> & { _id: Types.ObjectId } =
      await this.employeeModel
        .findOneAndUpdate(
          {
            $and: [
              { _id: id },
              {
                $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
              },
            ],
          },
          {
            $set: {
              userInfo: userInfo,
              updatedAt: new Date(),
            },
          },
          { new: true, lean: true },
        )
        .lean();

    return previousObject;
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    const employeeToDelete = await this.findById(id);

    if (employeeToDelete == null) {
      return false;
    }

    const result: Document<unknown, NonNullable<unknown>, User> &
      User & { _id: Types.ObjectId } =
      await this.employeeModel.findOneAndUpdate(
        {
          $and: [
            { _id: employeeToDelete._id },
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

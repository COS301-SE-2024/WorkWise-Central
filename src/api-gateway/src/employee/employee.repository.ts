import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FlattenMaps, Model, Types } from 'mongoose';
import { Employee, roleObject } from './entities/employee.entity';
import { InternalUpdateEmployeeDto, UpdateEmployeeUserInfoDto } from './dto/internal-update-employee.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EmployeeRepository {
  constructor(@InjectModel(Employee.name) private readonly employeeModel: Model<Employee>) {}

  async findAll() {
    return this.employeeModel.find().lean().exec();
  }

  async save(employee: Employee) {
    // console.log('in the save function');
    const newEmployeeModel = new this.employeeModel(employee);
    // console.log('newEmployeeModel: ', newEmployeeModel);
    return await newEmployeeModel.save();
  }

  async findAllInCompany(identifier: Types.ObjectId) {
    const result: (FlattenMaps<Employee> & { _id: Types.ObjectId })[] = await this.employeeModel
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

  async findAllInCompanyWithEmployee(identifier: Types.ObjectId) {
    return await this.employeeModel
      .find({
        $and: [
          {
            $or: [{ superiorId: identifier }, { subordinates: { $in: identifier } }],
          },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
  }

  async findAllInCompanyWithRoleName(identifier: Types.ObjectId, roleName: string) {
    const result: (FlattenMaps<Employee> & { _id: Types.ObjectId })[] = await this.employeeModel
      .find({
        $and: [
          {
            companyId: identifier,
          },
          {
            'role.roleName': roleName,
          },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();

    return result;
  }

  async findAllInCompanyWithRoleId(identifier: Types.ObjectId, roleId: Types.ObjectId) {
    const result: (FlattenMaps<Employee> & { _id: Types.ObjectId })[] = await this.employeeModel
      .find({
        $and: [
          {
            companyId: identifier,
          },
          {
            'role.roleId': roleId,
          },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();

    return result;
  }

  async DetailedFindAllInCompany(identifier: Types.ObjectId, fieldsToPouplate: string[]) {
    const result: (FlattenMaps<Employee> & { _id: Types.ObjectId })[] = await this.employeeModel
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
    // console.log('identifier: ', identifier);
    if (typeof identifier === 'string') {
      identifier = new Types.ObjectId(identifier);
    }
    // console.log('identifier: ', identifier);
    const result = this.employeeModel
      .findOne({
        $and: [
          {
            _id: identifier,
          },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
    // console.log('result from repository: ', result);
    return result;
  }

  async DetailedFindById(identifier: Types.ObjectId, fieldsToPopulate: string[]) {
    return this.employeeModel
      .findOne({
        $and: [
          { _id: identifier },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .populate(fieldsToPopulate)
      .lean();
  }

  async findByIds(identifiers: Types.ObjectId[]) {
    const ids = identifiers.map((id) => new Types.ObjectId(id));

    const result: (FlattenMaps<Employee> & { _id: Types.ObjectId })[] = await this.employeeModel
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
    const result: FlattenMaps<Employee> & { _id: Types.ObjectId } = await this.employeeModel
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

  async employeeExistsForCompany(id: Types.ObjectId, companyIdentification: Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<Employee> & { _id: Types.ObjectId } = await this.employeeModel
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
      .findOne({ _id: new Types.ObjectId(employeeId) }, { companyId: 1, _id: 0 })
      .findOne({ _id: new Types.ObjectId(employeeId) }, { companyId: 1, _id: 0 })
      .lean();

    return result ? result.companyId : null;
  }

  async update(id: Types.ObjectId, updateEmployeeDto: InternalUpdateEmployeeDto) {
    id = new Types.ObjectId(id);
    return await this.employeeModel
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
  }

  async removeAllReferencesToTeam(teamId: Types.ObjectId) {
    const allEmployeesInCompany = await this.employeeModel
      .find({
        $and: [
          { teams: { $in: teamId } },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .exec();
    for (const employee of allEmployeesInCompany) {
      employee.teams = employee.teams.filter((team) => team.toString() != teamId.toString());
      employee.save();
    }
  }

  async updateSuperior(id: Types.ObjectId, superiorIdentifcation: Types.ObjectId) {
    const previousObject: FlattenMaps<Employee> & { _id: Types.ObjectId } = await this.employeeModel
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

  async updateSubordinates(id: Types.ObjectId, subordinatesIdentification: Types.ObjectId[]) {
    const previousObject: FlattenMaps<Employee> & { _id: Types.ObjectId } = await this.employeeModel
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

  async updateUserInfo(id: Types.ObjectId, userInfo: UpdateEmployeeUserInfoDto) {
    const previousObject: FlattenMaps<Employee> & { _id: Types.ObjectId } = await this.employeeModel
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

  async updateRole(roleId: Types.ObjectId, companyIdentification: Types.ObjectId, newRole: roleObject) {
    roleId = new Types.ObjectId(roleId);
    const previousObject = await this.employeeModel
      .updateMany(
        {
          $and: [
            { 'role.roleId': roleId },
            { companyId: companyIdentification },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        {
          $set: {
            'role.roleId': new Types.ObjectId(newRole.roleId),
            'role.roleName': newRole.roleName,
            'role.permissionSuite': newRole.permissionSuite,
            updatedAt: new Date(),
          },
        },
        { new: true, lean: true },
      )
      .lean();

    return previousObject;
  }

  async updateHourlyRate(
    roleId: Types.ObjectId,
    companyIdentification: Types.ObjectId,
    newHourlyRate: number,
    oldHourlyRate: number,
  ) {
    roleId = new Types.ObjectId(roleId);
    const previousObject = await this.employeeModel
      .updateMany(
        {
          $and: [
            { 'role.roleId': roleId },
            { companyId: companyIdentification },
            { hourlyRate: oldHourlyRate },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        {
          $set: {
            hourlyRate: newHourlyRate,
            updatedAt: new Date(),
          },
        },
        { new: true, lean: true },
      )
      .lean();

    return previousObject;
  }

  async allEmployeesInCompanyWithRole(id: Types.ObjectId) {
    id = new Types.ObjectId(id);
    const employees = await this.employeeModel
      .find({
        $and: [
          { 'role.roleId': id },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();

    return employees;
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    // const employeeToDelete = await this.findById(id);

    // if (employeeToDelete == null) {
    //   return false;
    // }

    const result: Document<unknown, NonNullable<unknown>, User> & User & { _id: Types.ObjectId } =
      await this.employeeModel.findOneAndUpdate(
        {
          $and: [
            { _id: new Types.ObjectId(id) },
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

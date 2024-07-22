import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import { Job } from './entities/job.entity';
import { UpdateJobDto } from './dto/update-job.dto';
import { Employee } from '../employee/entities/employee.entity';
import { Company } from '../company/entities/company.entity';
import { Team } from '../team/entities/team.entity';
import { isNotDeleted } from '../shared/soft-delete';
import { Comment } from './entities/job.entity';

@Injectable()
export class JobRepository {
  constructor(
    @InjectModel(Job.name)
    private jobModel: Model<Job>,
  ) {}

  private isNotDeleted = {
    $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
  };

  async save(job: Job) {
    const newJob = new this.jobModel(job);
    return await newJob.save();
  }

  async findById(
    identifier: Types.ObjectId,
  ): Promise<FlattenMaps<Job> & { _id: Types.ObjectId }> {
    const populatedFields: string[] = [
      'clientId',
      'assignedBy',
      'assignedEmployees',
      /*'inventoryUsed'*/ //TODO: When Inventory is added
    ];

    return this.jobModel
      .findOne({
        $and: [{ _id: identifier }, isNotDeleted],
      })
      .populate(populatedFields)
      .lean();
  }

  async findAll() {
    return this.jobModel.find(isNotDeleted).lean();
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    const filter = {
      $and: [{ companyId: companyId }, isNotDeleted],
    };

    return this.jobModel.find(filter).lean().exec();
  }

  jobComments = {
    path: 'comments',
    populate: [
      {
        path: 'employeeId',
        model: Employee.name,
      },
      {
        path: 'companyId',
        model: Company.name,
      },
    ],
  };

  jobTasks = {
    path: 'taskList',
    populate: [
      {
        path: 'assignedEmployees',
        model: Employee.name,
      },
    ],
  };

  jobAssignedEmployees = {
    path: 'assignedEmployees',
    populate: [
      {
        path: 'employeeIds',
        model: Employee.name,
      },
      {
        path: 'teamId',
        model: Team.name,
      },
    ],
  };

  async findAllInCompanyDetailed(
    companyId: Types.ObjectId,
    fieldsToPopulate: string[] = [
      'assignedEmployees',
      'assignedBy',
      'clientId',
      'comments',
    ],
  ) {
    const filter = {
      $and: [{ companyId: companyId }, isNotDeleted],
    };

    return this.jobModel //TODO: Test
      .find(filter)
      .populate(fieldsToPopulate)
      .populate(this.jobComments)
      .populate(this.jobAssignedEmployees)
      .populate(this.jobTasks)
      .lean()
      .exec();
  }

  async exists(id: Types.ObjectId) {
    return this.jobModel
      .findOne({
        $and: [{ _id: id }, isNotDeleted],
      })
      .lean();
  }

  async update(id: Types.ObjectId, updateJobDto: UpdateJobDto) {
    return this.jobModel
      .findOneAndUpdate(
        {
          $and: [{ _id: id }, isNotDeleted],
        },
        { $set: { ...updateJobDto }, updatedAt: new Date() },
        { new: true },
      )
      .lean();
  }

  async existsInCompany(id: Types.ObjectId, companyId: Types.ObjectId) {
    const result = await this.jobModel
      .findOne({
        $and: [{ _id: id }, { companyId: companyId }, isNotDeleted],
      })
      .lean();
    if (result != null && result.companyId.equals(companyId)) {
      return result;
    } else {
      return null;
    }
  }

  async delete(id: Types.ObjectId): Promise<boolean> {
    const result = await this.jobModel
      .findOneAndUpdate(
        {
          $and: [{ _id: id }, isNotDeleted],
        },
        { $set: { deletedAt: new Date() } },
      )
      .lean();

    return result != null;
  }

  async findOne(id: Types.ObjectId) {
    return await this.jobModel.findOne({ _id: id }).lean().exec();
  }

  //Specific endpoints

  async findAllForEmployee(employeeId: Types.ObjectId) {
    const filter = {
      $and: [
        { 'assignedEmployees.employeeIds': { $in: [employeeId] } },
        this.isNotDeleted,
      ],
    };
    return await this.jobModel.find(filter).lean().exec();
  }

  async findAllForEmployeeDetailed(employeeId: Types.ObjectId) {
    const fieldsToPopulate = [
      'assignedEmployees',
      'assignedBy',
      'clientId',
      'comments',
    ];
    const filter = {
      $and: [
        { 'assignedEmployees.employeeIds': { $in: [employeeId] } },
        this.isNotDeleted,
      ],
    };
    return await this.jobModel
      .find(filter)
      .populate(fieldsToPopulate)
      .lean()
      .exec();
  }

  async assignEmployee(employeeId: Types.ObjectId, jobId: Types.ObjectId) {
    return await this.jobModel
      .findOneAndUpdate(
        {
          $and: [
            {
              _id: jobId,
            },
            isNotDeleted,
          ],
        },
        { $push: { assignedEmployees: employeeId }, updatedAt: new Date() },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }

  async assignEmployees(employeeIds: Types.ObjectId[], jobId: Types.ObjectId) {
    return await this.jobModel
      .findOneAndUpdate(
        {
          $and: [
            {
              _id: jobId,
            },
            isNotDeleted,
          ],
        },
        {
          $push: { assignedEmployees: { $each: employeeIds } },
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }

  async unassignEmployee(employeeId: Types.ObjectId, jobId: Types.ObjectId) {
    return await this.jobModel
      .findOneAndUpdate(
        {
          $and: [
            {
              _id: jobId,
            },
            isNotDeleted,
          ],
        },
        { $pull: { assignedEmployees: employeeId }, updatedAt: new Date() },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }

  async unassignEmployees(
    employeeIds: Types.ObjectId[],
    jobId: Types.ObjectId,
  ) {
    return await this.jobModel
      .findOneAndUpdate(
        {
          $and: [
            {
              _id: jobId,
            },
            isNotDeleted,
          ],
        },
        {
          $pull: { assignedEmployees: { $in: employeeIds } },
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }

  async assignEmployeeToTask(
    //TODO: Speak to Jess and thando
    employeeId: Types.ObjectId,
    jobId: Types.ObjectId,
  ) {
    return await this.jobModel
      .findOneAndUpdate(
        {
          $and: [
            {
              _id: jobId,
            },
            isNotDeleted,
          ],
        },
        {
          $push: { 'taskList.assignedEmployees': employeeId },
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }

  async assignEmployeesToTask(
    employeeIds: Types.ObjectId[],
    jobId: Types.ObjectId,
  ) {
    return await this.jobModel
      .findOneAndUpdate(
        {
          $and: [
            {
              _id: jobId,
            },
            isNotDeleted,
          ],
        },
        {
          $push: { 'taskList.assignedEmployees': { $each: employeeIds } },
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }

  async unassignEmployeeFromTask(
    employeeId: Types.ObjectId,
    jobId: Types.ObjectId,
  ) {
    return await this.jobModel
      .findOneAndUpdate(
        {
          $and: [
            {
              _id: jobId,
            },
            isNotDeleted,
          ],
        },
        {
          $pull: { 'taskList.assignedEmployees': employeeId },
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }

  async unassignEmployeesFromTask(
    employeeIds: Types.ObjectId[],
    jobId: Types.ObjectId,
  ) {
    return await this.jobModel
      .findOneAndUpdate(
        {
          $and: [
            {
              _id: jobId,
            },
            isNotDeleted,
          ],
        },
        {
          $pull: { 'taskList.assignedEmployees': { $in: employeeIds } },
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }

  async updateTeam(teamId: Types.ObjectId, jobId: Types.ObjectId) {
    return await this.jobModel
      .findOneAndUpdate(
        {
          $and: [
            {
              _id: jobId,
            },
            isNotDeleted,
          ],
        },
        {
          $set: { 'assignedEmployees.teamId': teamId },
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }

  async addComment(newComment: Comment, jobId: Types.ObjectId) {
    return await this.jobModel
      .findOneAndUpdate(
        {
          $and: [
            {
              _id: jobId,
            },
            isNotDeleted,
          ],
        },
        {
          $push: { comments: newComment },
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }

  async removeComment(newComment: Comment, jobId: Types.ObjectId) {
    return await this.jobModel
      .findOneAndUpdate(
        {
          $and: [
            {
              _id: jobId,
            },
            isNotDeleted,
          ],
        },
        {
          $pull: { comments: newComment },
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }

  async editComment(newComment: Comment, jobId: Types.ObjectId) {
    return await this.jobModel
      .findOneAndUpdate(
        {
          $and: [
            {
              _id: jobId,
            },
            isNotDeleted,
          ],
        },
        {
          $pull: { comments: newComment },
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }
}

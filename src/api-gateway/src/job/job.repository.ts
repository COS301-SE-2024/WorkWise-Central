import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import { Comment, Job, Task } from './entities/job.entity';
import { UpdateJobDto } from './dto/update-job.dto';
import { Employee } from '../employee/entities/employee.entity';
import { Company } from '../company/entities/company.entity';
import { Team } from '../team/entities/team.entity';
import { isNotDeleted } from '../shared/soft-delete';
import { currentDate } from '../utils/Utils';

@Injectable()
export class JobRepository {
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

  defaultPopulatedFields: string[] = ['tags', 'priorityTag', 'history'];
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

  async findById(identifier: Types.ObjectId): Promise<FlattenMaps<Job> & { _id: Types.ObjectId }> {
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

  async findAllInCompanyDetailed(
    companyId: Types.ObjectId,
    fieldsToPopulate: string[] = ['assignedEmployees', 'assignedBy', 'clientId', 'comments'],
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
        { $set: { ...updateJobDto }, updatedAt: currentDate() },
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
    if (result != null && result.companyId.toString() === companyId.toString()) {
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
        { $set: { deletedAt: currentDate() } },
      )
      .lean();

    return result != null;
  }

  async findOne(id: Types.ObjectId) {
    return await this.jobModel.findOne({ _id: id }).lean().exec();
  }

  //Specific endpoints

  async findAllForEmployee(employeeId: Types.ObjectId) {
    console.log('Bruh');
    /*    const filter = {
      $and: [
        {
          'assignedEmployees.employeeIds': {
            $elemMatch: { employeeIds: employeeId },
          },
        },
        this.isNotDeleted,
      ],
    };*/
    const allJobs = await this.jobModel.find().lean().exec();
    const result: (FlattenMaps<Job> & { _id: Types.ObjectId })[] = allJobs.filter((x) =>
      x.assignedEmployees.employeeIds.includes(employeeId),
    );
    console.log(result);
    return result;
  }

  async findAllForEmployeeDetailed(employeeId: Types.ObjectId) {
    const fieldsToPopulate = ['assignedEmployees', 'assignedBy', 'clientId', 'comments'];
    const filter = {
      $and: [{ 'assignedEmployees.employeeIds': { $in: [employeeId] } }, this.isNotDeleted],
    };
    return await this.jobModel.find(filter).populate(fieldsToPopulate).lean().exec();
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
        {
          $push: { 'assignedEmployees.employeeIds': employeeId },
          updatedAt: currentDate(),
        },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }

  async assignEmployeeToTaskItem(
    employeeId: Types.ObjectId,
    jobId: Types.ObjectId,
    taskId: Types.ObjectId,
    itemId: Types.ObjectId,
  ) {
    const job = await this.jobModel
      .findOne({
        $and: [
          {
            _id: jobId,
          },
          isNotDeleted,
        ],
      })
      .exec();

    const task = job.taskList.find((t) => t._id.toString() === taskId.toString());
    const item = task.items.find((i) => i._id.toString() === itemId.toString());
    item.assignedEmployees.push(employeeId);
    return (await job.save()).toObject();
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
        {
          $pull: { 'assignedEmployees.employeeIds': employeeId },
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }

  /*
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
          $pull: { 'assignedEmployees.employeeIds': { $in: employeeIds } },
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }
*/

  async unassignEmployeeFromTaskItem(
    employeeId: Types.ObjectId,
    jobId: Types.ObjectId,
    taskId: Types.ObjectId,
    itemId: Types.ObjectId,
  ) {
    const job = await this.jobModel
      .findOne({
        $and: [
          {
            _id: jobId,
          },
          isNotDeleted,
        ],
      })
      .exec();

    const task = job.taskList.find((t) => t._id.toString() === taskId.toString());
    const item = task.items.find((i) => i._id.toString() === itemId.toString());
    item.assignedEmployees = item.assignedEmployees.filter((e) => e._id.toString() !== employeeId.toString());
    return (await job.save()).toObject();
  }

  async assignTeam(teamId: Types.ObjectId, jobId: Types.ObjectId) {
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
          $push: { 'assignedEmployees.teamIds': teamId },
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }

  async unassignTeam(teamId: Types.ObjectId, jobId: Types.ObjectId) {
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
          $pull: { 'assignedEmployees.teamIds': teamId },
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

  async removeComment(jobId: Types.ObjectId, commentId: Types.ObjectId) {
    const job = await this.jobModel.findById({ _id: jobId });
    const commentToRemove = job.comments.find((comment) => comment._id.toString() === commentId.toString());
    job.comments = job.comments.filter((c) => {
      return c._id.toString() !== commentToRemove._id.toString();
    });
    job.updatedAt = new Date();
    await job.save();
    return job;
  }

  async editComment(jobId: Types.ObjectId, commentId: Types.ObjectId, newComment: string) {
    const job = await this.jobModel.findOne({
      $and: [
        {
          _id: jobId,
        },
        {
          'comments._id': commentId,
        },
        isNotDeleted,
      ],
    });

    const commentToUpdate = job.comments.find((comment) => comment._id.toString() === commentId.toString());

    commentToUpdate.comment = newComment;
    job.updatedAt = new Date();
    await job.save();
    return job.toObject();
  }

  async addHistory(event: History, jobId: Types.ObjectId) {
    const newHistory = await this.jobModel.updateOne(
      { _id: jobId },
      { $push: { history: event }, updatedAt: Date.now() },
      { new: true },
    );
    console.log(newHistory);
    return newHistory;
  }

  async addTask(task: Task, jobId: Types.ObjectId) {
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
          $push: { taskList: task },
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }

  async removeTask(jobId: Types.ObjectId, taskId: Types.ObjectId) {
    const job = await this.jobModel.findById({ _id: jobId });
    const taskToRemove = job.taskList.find((t) => t._id.toString() === taskId.toString());
    job.taskList = job.taskList.filter((t) => {
      return t._id.toString() !== taskToRemove._id.toString();
    });
    job.updatedAt = new Date();
    await job.save();
    return job;
  }

  async editTask(jobId: Types.ObjectId, taskId: Types.ObjectId, newTitle: string) {
    const job = await this.jobModel.findOne({
      $and: [
        {
          _id: jobId,
        },
        isNotDeleted,
      ],
    });

    const taskToUpdate = job.taskList.find((t) => t._id.toString() === taskId.toString());

    taskToUpdate.title = newTitle;
    job.updatedAt = new Date();
    await job.save();
    return job.toObject();
  }
}

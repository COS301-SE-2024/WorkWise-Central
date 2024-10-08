import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import {
  ClientFeedback,
  Comment,
  defaultPopulatedFields,
  Details,
  employeeComments,
  History,
  Job,
  jobAssignedEmployees,
  jobTaskListItems,
  Task,
} from './entities/job.entity';
import { UpdateJobDto } from './dto/update-job.dto';
import { isNotDeleted } from '../shared/soft-delete';
import { currentDate } from '../utils/Utils';
import { TaskItem } from './dto/create-job.dto';
import { UpdateTaskItemDto } from './dto/job-task-item.dto';

@Injectable()
export class JobRepository {
  constructor(
    @InjectModel(Job.name)
    private jobModel: Model<Job>,
  ) {}

  async save(job: Job) {
    const newJob = new this.jobModel(job);
    return await newJob.save();
  }

  async findById(identifier: Types.ObjectId): Promise<FlattenMaps<Job> & { _id: Types.ObjectId }> {
    return this.jobModel
      .findOne({
        $and: [{ _id: identifier }, isNotDeleted],
      })
      .populate(defaultPopulatedFields)
      .populate(jobAssignedEmployees)
      .populate(employeeComments)
      .populate(jobTaskListItems)
      .lean();
  }

  async findAll() {
    return this.jobModel.find(isNotDeleted).lean();
  }

  async findAllForClient(clientId: Types.ObjectId) {
    const filter = {
      $and: [{ clientId: clientId }, isNotDeleted],
    };

    return this.jobModel.find(filter).lean().exec();
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    const filter = {
      $and: [{ companyId: companyId }, isNotDeleted],
    };

    return this.jobModel.find(filter).lean().exec();
  }

  async findAllInCompanyDetailed(
    companyId: Types.ObjectId,
    //fieldsToPopulate: string[] = ['assignedEmployees', 'assignedBy', 'clientId', 'comments'],
  ) {
    const filter = {
      $and: [{ companyId: companyId }, isNotDeleted],
    };

    return this.jobModel //TODO: Test
      .find(filter)
      .populate(defaultPopulatedFields)
      .populate(jobAssignedEmployees)
      .populate(employeeComments)
      .populate(jobTaskListItems)
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
    const job = await this.jobModel.findOne({ $and: [{ _id: id }, isNotDeleted] }).exec();
    const newHistory: History[] = [];
    if (updateJobDto.clientId) {
      newHistory.push(new History('The Client was changed'));
      job.clientId = updateJobDto.clientId;
      job.markModified('clientId');
    }
    if (updateJobDto.status) {
      job.status = updateJobDto.status;
      job.markModified('status');
    }
    if (updateJobDto.details) {
      const updatedDetails: Details = { ...job.details, ...updateJobDto.details };
      updatedDetails.address = { ...job.details.address, ...updateJobDto.details.address };
      console.log(updatedDetails);
      job.details = updatedDetails;
      job.markModified('details');
    }
    // if (updateJobDto.recordedDetails) {  //TODO: Speak to Jess
    //   const updatedDetails = { ...job.recordedDetails, ...updateJobDto.recordedDetails };
    //   console.log(updatedDetails);
    //   job.recordedDetails = updatedDetails;
    // }
    if (updateJobDto.clientFeedback) {
      const updatedDetails: ClientFeedback = { ...job.clientFeedback, ...updateJobDto.clientFeedback };
      console.log(updatedDetails);
      job.clientFeedback = updatedDetails;
      newHistory.push(new History('There is new feedback from the client'));
      job.markModified('clientFeedback');
    }
    if (updateJobDto.tags) {
      job.tags = updateJobDto.tags;
      newHistory.push(new History('The Tags were updated'));
      job.markModified('tags');
    }
    if (updateJobDto.attachments) {
      job.attachments = updateJobDto.attachments;
      job.markModified('attachments');
    }
    if (updateJobDto.coverImage) {
      job.coverImage = updateJobDto.coverImage;
      newHistory.push(new History('The Cover Image was updated'));
      job.markModified('coverImage');
    }
    for (const history of newHistory) {
      job.history.push(history);
      job.markModified('history');
    }
    return (await job.save()).toObject();
  }

  async addToHistory(id: Types.ObjectId, newEvent: History) {
    this.jobModel
      .findOneAndUpdate(
        {
          $and: [{ _id: id }, isNotDeleted],
        },
        { $push: { history: newEvent }, updatedAt: currentDate() },
        { new: true },
      )
      .lean();
    console.log(`Updated History for Job ${id}`);
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
    return await this.jobModel
      .findOne({ $and: [{ _id: id }, isNotDeleted] })
      .lean()
      .exec();
  }

  async findOneInternal(id: Types.ObjectId) {
    return await this.jobModel.findOne({ $and: [{ _id: id }, isNotDeleted] }).exec();
  }

  //Specific endpoints

  async findAllForEmployee(employeeId: Types.ObjectId) {
    return this.jobModel
      .find({
        $and: [
          {
            $or: [{ 'assignedEmployees.employeeIds': employeeId }, { 'taskList.items.assignedEmployees': employeeId }],
          },
          isNotDeleted,
        ],
      })
      .lean()
      .populate(defaultPopulatedFields)
      .populate(jobAssignedEmployees)
      .populate(employeeComments)
      .populate(jobTaskListItems)
      .exec();
  }

  async findAllCurrentForClient(clientId: Types.ObjectId, statusId: Types.ObjectId) {
    return this.jobModel
      .find({
        $and: [{ clientId: clientId }, { status: { $ne: statusId } }, isNotDeleted],
      })
      .populate('status')
      .lean()
      .exec();
  }

  async findAllForEmployees(employeeIds: Types.ObjectId[]) {
    const filter = {
      $and: [
        {
          $or: [
            { 'assignedEmployees.employeeIds': { $in: employeeIds } },
            { 'taskList.items.assignedEmployees': { $in: employeeIds } },
          ],
        },
        isNotDeleted,
      ],
    };
    return await this.jobModel.find(filter).lean().exec();
  }

  async findAllForEmployeesDetailed(employeeIds: Types.ObjectId[]) {
    const filter = {
      $and: [
        {
          $or: [
            { 'assignedEmployees.employeeIds': { $in: employeeIds } },
            { 'taskList.items.assignedEmployees': { $in: employeeIds } },
          ],
        },
        isNotDeleted,
      ],
    };
    return await this.jobModel
      .find(filter)
      .populate(defaultPopulatedFields)
      .populate(jobAssignedEmployees)
      .populate(employeeComments)
      .populate(jobTaskListItems)
      .lean()
      .exec();
  }

  async findAllForEmployeeDetailed(employeeId: Types.ObjectId) {
    const filter = {
      $and: [
        { $or: [{ 'assignedEmployees.employeeIds': employeeId }, { 'taskList.items.assignedEmployees': employeeId }] },
        isNotDeleted,
      ],
    };
    return await this.jobModel
      .find(filter)
      .populate(defaultPopulatedFields)
      .populate(jobAssignedEmployees)
      .populate(employeeComments)
      .populate(jobTaskListItems)
      .lean()
      .exec();
  }

  async assignEmployee(employeeId: Types.ObjectId, jobId: Types.ObjectId) {
    employeeId = new Types.ObjectId(employeeId);
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
          $addToSet: { 'assignedEmployees.employeeIds': employeeId },
          updatedAt: currentDate(),
        },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }

  async assignEmployees(employeeIds: Types.ObjectId[], jobId: Types.ObjectId) {
    const arr = [];
    for (const e of employeeIds) {
      arr.push(new Types.ObjectId(e));
    }
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
          $addToSet: { 'assignedEmployees.employeeIds': { $each: arr } },
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
    item.assignedEmployees.push(new Types.ObjectId(employeeId));
    job.markModified('taskList');
    return (await job.save()).toObject();
  }

  async unassignEmployee(employeeId: Types.ObjectId, jobId: Types.ObjectId) {
    const job = await this.findOneInternal(jobId);
    job.assignedEmployees.employeeIds = job.assignedEmployees.employeeIds.filter(
      (a) => a.toString() !== employeeId.toString(),
    );
    job.markModified('assignedEmployees');
    return (await job.save()).toObject();
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
      .populate(defaultPopulatedFields)
      .populate(jobAssignedEmployees)
      .populate(employeeComments)
      .populate(jobTaskListItems)
      .exec();

    const task = job.taskList.find((t) => t._id.toString() === taskId.toString());
    const item = task.items.find((i) => i._id.toString() === itemId.toString());
    item.assignedEmployees = item.assignedEmployees.filter((e) => e._id.toString() !== employeeId.toString());
    job.markModified('taskList');
    return (await job.save()).toObject();
  }

  async assignTeam(teamId: Types.ObjectId, jobId: Types.ObjectId, teamMemberIds: Types.ObjectId[]) {
    const arr: Types.ObjectId[] = [];
    for (const teamMemberId of teamMemberIds) {
      arr.push(new Types.ObjectId(teamMemberId));
    }
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
          $addToSet: { 'assignedEmployees.teamIds': teamId, 'assignedEmployees.employeeIds': { $each: arr } },
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .lean()
      .exec();
  }

  async unassignTeam(teamId: Types.ObjectId, jobId: Types.ObjectId, teamMemberIds: Types.ObjectId[]) {
    const job = await this.findOneInternal(jobId);
    job.assignedEmployees.teamIds = job.assignedEmployees.teamIds.filter((a) => a.toString() !== teamId.toString());

    for (const teamMemberId of teamMemberIds) {
      job.assignedEmployees.employeeIds = job.assignedEmployees.employeeIds.filter(
        (a) => a.toString() !== teamMemberId.toString(),
      );
    }
    job.markModified('assignedEmployees');
    return (await job.save()).toObject();
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
    job.markModified('comments');
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
    job.markModified('comments');
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
    job.markModified('taskList');
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
    job.markModified('taskList');
    await job.save();
    return job.toObject();
  }

  async addAttachments(jobId: Types.ObjectId, newUrls: string[]) {
    const job = await this.jobModel.updateOne(
      { _id: jobId },
      { $push: { attachments: { $each: newUrls } }, updatedAt: Date.now() },
      { new: true },
    );
    console.log(job);
    return job;
  }

  async updateAttachments(jobId: Types.ObjectId, newAttachments: string[]) {
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
    job.attachments = newAttachments;
    job.updatedAt = new Date();
    job.markModified('attachments');
    await job.save();
    return job.toObject();
  }

  async addJobTaskItem(jobId: Types.ObjectId, taskId: Types.ObjectId) {
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
    console.log(job);

    const task = job.taskList.find((t) => t._id.toString() === taskId.toString());
    task.items.push(new TaskItem());
    job.markModified('taskList');
    return (await job.save()).toObject();
  }

  async editJobTaskItem(jobId: Types.ObjectId, updateTaskItem: UpdateTaskItemDto) {
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

    const task = job.taskList.find((t) => t._id.toString() === updateTaskItem.taskId.toString());
    const item = task.items.find((i) => i._id.toString() === updateTaskItem.itemId.toString());

    if (updateTaskItem.description) item.description = updateTaskItem.description;
    if (updateTaskItem.done) item.done = updateTaskItem.done;
    if (updateTaskItem.dueDate) item.dueDate = updateTaskItem.dueDate;

    job.markModified('taskList');
    await job.save();
    return job.toObject();
  }

  async removeJobTaskItem(jobId: Types.ObjectId, taskId: Types.ObjectId, itemId: Types.ObjectId) {
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

    task.items = task.items.filter((i) => i._id.toString() !== itemId.toString());
    job.markModified('taskList');
    await job.save();
    return job.toObject();
  }

  removeClient(fullName: string, clientId: Types.ObjectId) {
    const event = new History(fullName + ' Removed client from the job');
    this.jobModel
      .updateMany(
        { $and: [{ clientId: clientId }, isNotDeleted] },
        {
          $set: { clientId: null },
          $push: { history: event },
        },
      )
      .exec();
  }

  async deleteAllInCompany(companyId: Types.ObjectId) {
    const now = currentDate();
    await this.jobModel.updateMany(
      {
        $and: [{ companyId: companyId }, isNotDeleted],
      },
      {
        $set: { deletedAt: now },
      },
    );
  }

  async removeAllReferencesToEmployee(companyId: Types.ObjectId, employeeId: Types.ObjectId) {
    const allJobsInCompany = await this.jobModel.find({ $and: [{ companyId: companyId }, isNotDeleted] }).exec();
    for (const job of allJobsInCompany) {
      if (job.assignedBy) {
        if (job.assignedBy.toString() === employeeId.toString()) job.assignedBy = null;
      }

      const assignedEmp = job.assignedEmployees.employeeIds.find((e) => e._id.toString() === employeeId.toString());
      if (assignedEmp) {
        job.assignedEmployees.employeeIds = job.assignedEmployees.employeeIds.filter(
          (e) => e._id.toString() !== employeeId.toString(),
        );
        job.markModified('assignedEmployees');
      }
      for (const comment of job.comments) {
        if (comment.employeeId.toString() === employeeId.toString()) {
          comment.employeeId = null;
        }
        job.markModified('comments');
      }
      for (const task of job.taskList) {
        for (const item of task.items) {
          item.assignedEmployees = item.assignedEmployees.filter((e) => e._id.toString() !== employeeId.toString());
        }
      }
      job.markModified('taskList');
      job.markModified('comments');
      job.markModified('assignedEmployees');
      job.markModified('assignedBy');
      job.markModified('taskList');
      await job.save();
    }
  }

  async removeAllReferencesToTeam(teamId: Types.ObjectId) {
    const allJobsInCompany = await this.jobModel
      .find({ $and: [{ 'assignedEmployees.teamIds': teamId }, isNotDeleted] })
      .exec();
    for (const job of allJobsInCompany) {
      const assignedEmp = job.assignedEmployees.teamIds.find((e) => e._id.toString() === teamId.toString());
      if (!assignedEmp) {
        job.assignedEmployees.teamIds = job.assignedEmployees.teamIds.filter(
          (e) => e._id.toString() !== teamId.toString(),
        );
      }
      job.save();
    }
  }

  async convertTaskToJob(jobId: Types.ObjectId, taskId: Types.ObjectId, taskItemId: Types.ObjectId) {
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
    const item = task.items.find((i) => i._id.toString() === taskItemId.toString());

    task.items = task.items.filter((i) => i._id.toString() !== taskItemId.toString());
    job.history.push(new History(`${item.description} was converted into a Job`));
    job.markModified('taskList');
    job.markModified('history');
    return (await job.save()).toObject();
  }

  async getAllRelatedEmployees(jobId: Types.ObjectId) {
    const job = await this.jobModel
      .findOne({ $and: [{ _id: jobId }, isNotDeleted] })
      .select(['assignedBy', 'assignedEmployees', 'taskList.items.assignedEmployees'])
      .lean()
      .exec();
    console.log(job);
    return job;
  }

  findCompletedForClient(clientId: Types.ObjectId, statusId: Types.ObjectId) {
    return this.jobModel
      .find({
        $and: [{ clientId: clientId }, { status: statusId }, isNotDeleted],
      })
      .lean()
      .exec();
  }
}

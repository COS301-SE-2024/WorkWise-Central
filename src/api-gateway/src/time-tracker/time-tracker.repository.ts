import { Injectable } from '@nestjs/common';
import { TimeInterval, TimeTracker } from './entities/time-tracker.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { currentDate } from '../utils/Utils';
import { isNotDeleted } from '../shared/soft-delete';

@Injectable()
export class TimeTrackerRepository {
  constructor(
    @InjectModel(TimeTracker.name)
    private timeTrackerModel: Model<TimeTracker>,
  ) {}
  async checkIn(employeeId: Types.ObjectId, jobId: Types.ObjectId, companyId: Types.ObjectId) {
    const timeTracker = new TimeTracker();
    timeTracker.employeeId = employeeId;
    timeTracker.jobId = jobId;
    timeTracker.checkInTime = currentDate();
    timeTracker.companyId = companyId;

    const checkIn = new this.timeTrackerModel(timeTracker);
    return (await checkIn.save()).toObject();
  }

  async checkOut(employeeId: Types.ObjectId, jobId: Types.ObjectId) {
    const checkIn = await this.timeTrackerModel
      .findOne({ $and: [{ employeeId: employeeId }, { jobId: jobId }, { checkOutTime: null }] })
      .exec();
    checkIn.checkOutTime = currentDate();
    checkIn.markModified('checkOutTime');
    return (await checkIn.save()).toObject();
  }

  async pause(employeeId: Types.ObjectId, jobId: Types.ObjectId) {
    const checkIn = await this.timeTrackerModel
      .findOne({ $and: [{ employeeId: employeeId }, { jobId: jobId }, { checkOutTime: null }] })
      .exec();
    checkIn.pauses.push(new TimeInterval(currentDate()));
    checkIn.markModified('pauses');
    return (await checkIn.save()).toObject();
  }

  async resume(employeeId: Types.ObjectId, jobId: Types.ObjectId) {
    const checkIn = await this.timeTrackerModel
      .findOne({ $and: [{ employeeId: employeeId }, { jobId: jobId }, { checkOutTime: null }] })
      .exec();
    if (checkIn.pauses.length == 0) return checkIn.toObject();
    const lastIndex: number = checkIn.pauses.length - 1;
    checkIn.pauses[lastIndex].end = currentDate();
    checkIn.markModified('pauses');
    return (await checkIn.save()).toObject();
  }

  async getLatestCheckin(employeeId: Types.ObjectId, jobId: Types.ObjectId) {
    return this.timeTrackerModel
      .findOne({ $and: [{ employeeId: employeeId }, { jobId: jobId }, { checkOutTime: null }] })
      .exec();
  }

  async getAllCompletedCheckins(employeeId: Types.ObjectId) {
    return this.timeTrackerModel
      .findOne({ $and: [{ employeeId: employeeId }, { checkOutTime: { $ne: null } }] })
      .exec();
  }

  async getAllRunningCheckins(employeeId: Types.ObjectId) {
    return this.timeTrackerModel.findOne({ $and: [{ employeeId: employeeId }, { checkOutTime: null }] }).exec();
  }

  async getAllEmployeeCheckins(employeeId: Types.ObjectId) {
    return this.timeTrackerModel.findOne({ employeeId: employeeId }).exec();
  }

  async getAllCompanyCheckins(employeeId: Types.ObjectId) {
    return this.timeTrackerModel.findOne({ employeeId: employeeId }).exec();
  }

  async getAllIntervalsOnJob(employeeId: Types.ObjectId, jobId: Types.ObjectId) {
    const times = await this.timeTrackerModel
      .find({ $and: [{ employeeId: employeeId }, { jobId: jobId }, { checkOutTime: { $ne: null } }] })
      .exec();
    console.log(times);
    return times;
  }

  async closeAllTimeTrackersForJob(jobId: Types.ObjectId) {
    const trackers = await this.timeTrackerModel.find({ $and: [{ jobId: jobId }, isNotDeleted] }).exec();
    console.log(trackers);
    if (!trackers) return true;
    const now = currentDate();
    const updatePromises = trackers.map(async (tracker) => {
      for (const pause of tracker.pauses) {
        if (!pause.end) pause.end = now;
      }
      tracker.markModified('pauses');
      if (!tracker.checkOutTime) {
        tracker.checkOutTime = now;
        tracker.markModified('checkOutTime');
      }
      return tracker.save();
    });

    await Promise.all(updatePromises);
    return true;
  }
}

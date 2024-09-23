import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { VideoCall } from './entities/video-call.entity';
import { UpdateVideoCallDto } from './dto/update-video-call.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class VideoCallRepository {
  constructor(@InjectModel(VideoCall.name) private readonly VideoCallModel: Model<VideoCall>) {}

  async findAll() {
    return this.VideoCallModel.find().exec();
  }

  async save(VideoCall: VideoCall) {
    const newVideoCallModel = new this.VideoCallModel(VideoCall);
    return await newVideoCallModel.save();
  }

  async findById(identifier: Types.ObjectId) {
    const result = await this.VideoCallModel.findOne({
      $and: [
        { _id: identifier },
        {
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        },
      ],
    }).lean();

    return result;
  }

  async findAllInCompany(identifier: Types.ObjectId) {
    const result = await this.VideoCallModel.find({
      $and: [
        {
          companyId: identifier,
        },
        {
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        },
      ],
    }).lean();

    return result;
  }

  async findAllForEmployee(identifier: Types.ObjectId) {
    const result = await this.VideoCallModel.find({
      $and: [
        {
          participants: identifier,
        },
        {
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        },
      ],
    }).lean();

    return result;
  }

  async exists(identifier: string) {
    const result = await this.VideoCallModel.findOne({ roomId: identifier }).lean();

    return result != null;
  }

  async update(id: Types.ObjectId, updateVideoCallDto: UpdateVideoCallDto) {
    return await this.VideoCallModel.findOneAndUpdate(
      {
        $and: [
          { _id: id },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      },
      { $set: { ...updateVideoCallDto }, updatedAt: new Date() },
    ).lean();
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    const VideoCallToDelete = await this.findById(id);

    const result: Document<unknown, NonNullable<unknown>, User> & User & { _id: Types.ObjectId } =
      await this.VideoCallModel.findOneAndUpdate(
        {
          $and: [
            { _id: VideoCallToDelete._id },
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

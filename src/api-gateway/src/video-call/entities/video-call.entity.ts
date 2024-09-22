import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';
import { CreateVideoCallDto } from '../dto/create-video-call.dto';

@Schema()
export class VideoCall {
  constructor(createTeamDto: CreateVideoCallDto) {
    this.title = createTeamDto.title;
    this.scheduledTime = createTeamDto.scheduledTime;
    this.participants = createTeamDto.participants;
    this.companyId = createTeamDto.companyId;
    this.details = createTeamDto.details;
    this.createdAt = new Date();
  }
  @ApiProperty()
  @Prop({ required: true })
  title: string;

  @ApiProperty()
  @Prop({ required: true })
  scheduledTime: Date;

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: true, default: [], ref: 'Employee' })
  participants: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Company' })
  companyId: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: true })
  details: string;

  @ApiHideProperty()
  @Prop({ required: true })
  roomId: string;

  @ApiHideProperty()
  @Prop({ required: true, default: new Date() })
  public createdAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public updatedAt?: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public deletedAt?: Date;
}

export const VideoCallSchema = SchemaFactory.createForClass(VideoCall);

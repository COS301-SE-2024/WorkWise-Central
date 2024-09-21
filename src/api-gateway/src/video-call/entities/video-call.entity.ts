import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class VideoCall extends Document {
  @ApiProperty()
  @Prop({ required: true })
  title: string;

  @ApiProperty()
  @Prop({ required: true })
  scheduledTime: Date;

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: true, default: [] })
  participants: Types.ObjectId[];

  @ApiProperty()
  @Prop({ required: true })
  callId: string;

  @ApiProperty()
  @Prop({ required: true })
  details: string;

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

import { SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export const defaultTagColour: string = '#1a89c4';

@Schema()
export class JobStatus {
  constructor(status: string, colour: string, companyId: Types.ObjectId) {
    this.status = status;
    this.colour = colour;
    this.companyId = companyId;
  }
  @Prop({ type: String, required: true })
  status: string;
  @Prop({ type: String, required: false, default: '#1a89c4' })
  colour: string = defaultTagColour; //Will be hex value
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'Company' /*Company.name*/,
  })
  companyId: Types.ObjectId;
}

//export const protectedStatuses = ['No status', 'Archive', 'To Do', 'In Progress', 'Complete'];

export const JobStatusSchema = SchemaFactory.createForClass(JobStatus);

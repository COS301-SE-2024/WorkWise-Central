import { SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Company } from '../../company/entities/company.entity';

export const defaultTagColour: string = '#FAF9F6';

@Schema()
export class JobStatus {
  constructor(status: string, colour: string, companyId: Types.ObjectId) {
    this.status = status;
    this.colour = colour;
    this.companyId = companyId;
  }
  @Prop({ type: String, required: true })
  status: string;
  @Prop({ type: String, required: false, default: '#fbfffc' })
  colour: string = defaultTagColour; //Will be hex value
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Company.name })
  companyId: Types.ObjectId;
}

export class JobStatusApiObject {
  _id: Types.ObjectId;
  status: string;
  colour: string;
  companyId: Types.ObjectId;
}

export const JobStatusSchema = SchemaFactory.createForClass(JobStatus);

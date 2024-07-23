import { SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Company } from '../../company/entities/company.entity';

@Schema()
export class JobTag {
  @Prop({ type: String, required: true })
  label: string;
  @Prop({ type: String, required: false, default: '#FAF9F6' })
  colour: string; //Will be hex value
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Company.name })
  companyId: Types.ObjectId;
}

//TODO: Flesh out
export class JobPriorityTag {
  @Prop({ type: String, required: true })
  value: string;
  @Prop({ type: String, required: false, default: '#F00000' })
  colour: string; //Will be hex value
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Company.name })
  companyId: Types.ObjectId;
}

export const JobTagSchema = SchemaFactory.createForClass(JobTag);

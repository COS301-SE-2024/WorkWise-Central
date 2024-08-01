import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Company } from '../../company/entities/company.entity';
import { SchemaTypes, Types } from 'mongoose';

export const defaultTagColour: string = '#FAF9F6';
export const defaultPriorityColour: string = '#fbfffc';

@Schema()
export class JobTag {
  constructor(label: string, colour: string, companyId: Types.ObjectId) {
    this.label = label;
    this.colour = colour;
    this.companyId = companyId;
  }

  @Prop({ type: String, required: true })
  label: string;
  @Prop({ type: String, required: false, default: defaultTagColour })
  colour: string; //Will be hex value
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Company.name })
  companyId: Types.ObjectId;
}

@Schema()
export class JobPriorityTag {
  constructor(
    label: string,
    priorityLevel: number,
    colour: string,
    companyId: Types.ObjectId,
  ) {
    this.label = label;
    this.priorityLevel = priorityLevel;
    this.colour = colour;
    this.companyId = companyId;
  }

  @Prop({ type: String, required: true })
  label: string;
  @Prop({ type: Number, required: true, default: 0 })
  priorityLevel: number;
  @Prop({ type: String, required: false, default: '#fbfffc' })
  colour: string; //Will be hex value
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Company.name })
  companyId: Types.ObjectId;
}

export const JobTagSchema = SchemaFactory.createForClass(JobTag);
export const JobPriorityTagSchema =
  SchemaFactory.createForClass(JobPriorityTag);

export class JobTagObject {
  _id: Types.ObjectId;
  label: string;
  colour: string; //Will be hex value
  companyId: Types.ObjectId;
}
export class JobPriorityTagApiObject {
  _id: Types.ObjectId;
  label: string;
  priorityLevel: number;
  colour: string; //Will be hex value
  companyId: Types.ObjectId;
}

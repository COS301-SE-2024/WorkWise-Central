import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class JobTag {
  @Prop({ type: String, required: true })
  label: string;
  @Prop({ type: String, required: false, default: '#FAF9F6' })
  colour: string; //Will be hex value
}

@Schema()
export class JobPriorityTag {
  @Prop({ type: String, required: true })
  label: string;
  @Prop({ type: Number, required: true, default: 0 })
  priorityLevel: number;
  @Prop({ type: String, required: false, default: '#fbfffc' })
  colour: string; //Will be hex value
}

export const JobTagSchema = SchemaFactory.createForClass(JobTag);
export const JobPriorityTagSchema =
  SchemaFactory.createForClass(JobPriorityTag);

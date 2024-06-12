import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { CreateJobDto } from '../dto/create-job.dto';
import { getModelForClass } from '@typegoose/typegoose';

export class address {
  @ApiProperty()
  @Prop({ type: String, required: true })
  street: string;
  @ApiProperty()
  @Prop({ type: String, required: true })
  suburb: string;
  @ApiProperty()
  @Prop({ type: String, required: true })
  city: string;
  @ApiProperty()
  @Prop({ type: String, required: true })
  postalCode: string;
  @ApiProperty()
  @Prop({ type: String, required: true })
  complex: string;
  @ApiProperty()
  @Prop({ type: String, required: true })
  houseNumber: string;
}

export class clientFeedback {
  @ApiProperty()
  @Prop({ required: false, default: 10 })
  jobRating: number;

  @ApiProperty()
  @Prop({ required: false, default: 10 })
  customerServiceRating: number;

  @ApiProperty()
  @Prop({ required: false, default: 10 })
  comments: string;
}

export class details {
  @ApiProperty()
  @Prop({ required: true })
  heading: string;

  @ApiProperty()
  @Prop({ required: true })
  description: string;

  @ApiProperty()
  @Prop({ required: true })
  notes: string;

  @ApiProperty()
  @Prop({ required: true })
  address: address;

  @ApiProperty()
  @Prop({ required: true })
  startDate: Date;

  @ApiProperty()
  @Prop({ required: true })
  endDate: Date;
}

@Schema()
export class Job {
  constructor(createJobDto: CreateJobDto) {
    if (createJobDto.clientUsername)
      this.clientUsername = createJobDto.clientUsername;
    this.clientId = new Types.ObjectId(); //It must be validated in jobController
    this.companyId = new Types.ObjectId(createJobDto.companyId); //It must be validated in jobController
    this.assignedBy = new Types.ObjectId(createJobDto.assignedBy);
    //this.scheduledDateTime = createJobDto.scheduledDateTime;
    this.status = createJobDto.status;
    if (createJobDto.inventoryUsed && createJobDto.inventoryUsed.length > 0)
      this.inventoryUsed = createJobDto.inventoryUsed.map(
        (item) => new Types.ObjectId(item),
      );
    this.details = {
      heading: createJobDto.details.heading,
      description: createJobDto.details.description,
      notes: createJobDto.details.notes,
      address: createJobDto.details.address,
      startDate: createJobDto.details.startDate,
      endDate: createJobDto.details.endDate,
    };

    this.imagesTaken = createJobDto.imagesTaken;
    this.created_at = new Date();
  }

  @ApiProperty()
  @Prop({ required: true })
  clientId: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: false, default: 'none' })
  clientUsername: string;

  @ApiProperty()
  @Prop({ required: true })
  companyId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, required: true })
  assignedBy: Types.ObjectId;

  /*  @ApiProperty()
  @Prop({ type: [Types.ObjectId], required: true })
  assignedEmployees: Types.ObjectId[];*/

  @ApiProperty()
  @Prop({ required: true })
  status: string;

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], required: true, default: [] })
  inventoryUsed: Types.ObjectId[];

  @ApiProperty()
  @Prop({ required: true })
  details: details;

  @ApiProperty()
  @Prop({ type: [String], required: true })
  imagesTaken: string[];

  @ApiProperty()
  @Prop({ required: false })
  clientFeedback: clientFeedback;

  @ApiProperty()
  @Prop({ required: false, default: new Date() })
  public created_at: Date;

  @ApiProperty()
  @Prop({ required: false })
  public updated_at: Date;

  @ApiProperty()
  @Prop({ required: false })
  public deleted_at: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);

export const JobModel = getModelForClass(Job);

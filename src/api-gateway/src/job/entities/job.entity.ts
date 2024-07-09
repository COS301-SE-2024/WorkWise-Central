import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types, SchemaTypes } from 'mongoose';
import { CreateJobDto } from '../dto/create-job.dto';
import { Client } from '../../client/entities/client.entity';
import { Company } from '../../company/entities/company.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Team } from '../../team/entities/team.entity';

export class Address {
  //They are optional for flexibility
  @Prop({ type: String, required: false })
  street?: string;
  @Prop({ type: String, required: false })
  province?: string;
  @Prop({ type: String, required: false })
  suburb?: string;
  @Prop({ type: String, required: false })
  city?: string;
  @Prop({ type: String, required: false })
  postalCode?: string;
  @Prop({ type: String, required: false })
  complex?: string;
  @Prop({ type: String, required: false })
  houseNumber?: string;
}

export class ClientFeedback {
  @ApiProperty()
  @Prop({ type: Number, required: false, default: 10 })
  jobRating?: number;

  @ApiProperty()
  @Prop({ type: Number, required: false, default: 10 })
  customerServiceRating?: number;

  @ApiProperty()
  @Prop({ type: String, required: false, default: '' })
  comments?: string;
}

export class Details {
  @ApiProperty()
  @Prop({ type: String, required: true })
  heading: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  description: string;

  @ApiProperty()
  @Prop({ type: Address, required: true })
  address: Address;

  @ApiProperty()
  @Prop({ type: Date, required: true })
  startDate: Date;

  @ApiProperty()
  @Prop({ type: Date, required: false })
  endDate?: Date;
}

export class InventoryUsed {
  @Prop({ type: SchemaTypes.ObjectId, required: true /*, ref: 'Inventory' */ })
  inventoryItemId: Types.ObjectId;
  @Prop({ type: String, required: true })
  inventoryItemName: string;
  @Prop({ type: Number, required: true, default: 0 })
  quantityUsed: number = 0;
}

export class RecordedDetails {
  @ApiProperty()
  @Prop({ type: [String], required: false, default: [] })
  imagesTaken?: string[] = [];

  @ApiProperty()
  @Prop({ type: [InventoryUsed], required: false, default: [] })
  inventoryUsed?: InventoryUsed[] = [];
}

export class AssignedEmployees {
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: false,
    ref: 'Employee',
    default: [],
  })
  employeeIds?: Types.ObjectId[] = [];
  @Prop({ type: SchemaTypes.ObjectId, required: false, ref: Team.name })
  teamId?: Types.ObjectId;
}

export class Task {
  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: String, required: true, default: 'To do' })
  status: string = 'To do';

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: false, default: [] })
  assignedEmployees?: Types.ObjectId[] = [];
}

export class Comment {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  employeeId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: String, required: true })
  comment: string;

  @ApiProperty()
  @Prop({ type: Date, required: false, default: new Date() })
  date?: Date = new Date();
}

@Schema()
export class Job {
  constructor(createJobDto: CreateJobDto) {
    //Object.assign(this, createJobDto);
    if (createJobDto.companyId) this.companyId = createJobDto.companyId;
    if (createJobDto.clientId) this.clientId = createJobDto.clientId;
    if (createJobDto.clientUsername)
      this.clientUsername = createJobDto.clientUsername;
    if (createJobDto.assignedBy) this.assignedBy = createJobDto.assignedBy;
    if (createJobDto.assignedEmployees)
      this.assignedEmployees = createJobDto.assignedEmployees;
    if (createJobDto.status) this.status = createJobDto.status;
    if (createJobDto.details) this.details = createJobDto.details;
    if (createJobDto.recordedDetails)
      this.recordedDetails = createJobDto.recordedDetails;
    if (createJobDto.clientFeedback)
      this.clientFeedback = createJobDto.clientFeedback;
    if (createJobDto.taskList) this.taskList = createJobDto.taskList;
    if (createJobDto.comments) this.comments = createJobDto.comments;
    this.createdAt = new Date();
  }

  @ApiProperty()
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: Company.name,
  })
  companyId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: false, ref: Client.name })
  clientId?: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: false, default: `Client-${Date.now()}` })
  clientUsername?: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Employee.name })
  assignedBy: Types.ObjectId;

  @ApiProperty()
  @Prop({
    type: AssignedEmployees,
    required: false,
    default: new AssignedEmployees(), //Will this work?💀
    ref: Employee.name,
  })
  assignedEmployees?: AssignedEmployees = new AssignedEmployees();

  /*  @ApiProperty()
  @Prop({ type: [Types.ObjectId], required: true })
  assignedEmployees: Types.ObjectId[];*/

  @ApiProperty()
  @Prop({ type: String, required: true, default: 'To do' })
  status: string = 'To do';

  @ApiProperty()
  @Prop({ type: Details, required: true })
  details: Details;

  @ApiProperty()
  @Prop({
    type: RecordedDetails,
    required: false,
    default: new RecordedDetails(), //Again, will this work?💀
  })
  recordedDetails?: RecordedDetails = new RecordedDetails();

  @ApiProperty()
  @Prop({ type: ClientFeedback, required: false })
  clientFeedback?: ClientFeedback;

  @ApiProperty()
  @Prop({ type: [Task], required: false, default: [] })
  taskList?: Task[] = [];

  @ApiProperty()
  @Prop({ type: [Comment], required: false, default: [] })
  comments?: Comment[] = [];

  @ApiProperty()
  @Prop({ required: false, default: new Date() })
  public createdAt: Date;

  @ApiProperty()
  @Prop({ required: false })
  public updatedAt: Date;

  @ApiProperty()
  @Prop({ required: false })
  public deletedAt: Date;
}

export class JobApiObject {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  companyId: Types.ObjectId;

  @ApiProperty()
  clientId?: Types.ObjectId;

  @ApiProperty()
  clientUsername?: string;

  @ApiProperty()
  assignedBy: Types.ObjectId;

  @ApiProperty()
  assignedEmployees?: AssignedEmployees;

  @ApiProperty()
  status: string = 'To do';

  @ApiProperty()
  details: Details;

  @ApiProperty()
  recordedDetails?: RecordedDetails;

  @ApiProperty()
  clientFeedback?: ClientFeedback;

  @ApiProperty()
  taskList?: Task[];

  @ApiProperty()
  comments?: Comment[];

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;
}

export class JobResponseDto {
  constructor(data: JobApiObject) {
    this.data = data;
  }
  data: JobApiObject;
}

export const JobSchema = SchemaFactory.createForClass(Job);

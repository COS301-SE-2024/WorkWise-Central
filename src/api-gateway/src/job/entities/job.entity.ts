import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types, SchemaTypes } from 'mongoose';
import { CreateJobDto } from '../dto/create-job.dto';
import { Client } from '../../client/entities/client.entity';
import { Company } from '../../company/entities/company.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Team } from '../../team/entities/team.entity';
import { JobTag } from './job-tag.entity';

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
  inventoryUsed?: InventoryUsed[] = []; //TODO: Flesh out
}

export class AssignedEmployees {
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: false,
    ref: Employee.name,
    default: [],
  })
  employeeIds?: Types.ObjectId[] = [];
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: false,
    ref: Team.name,
    default: [],
  })
  teamIds?: Types.ObjectId[] = [];
}

@Schema()
export class Task {
  @ApiProperty()
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    default: new Types.ObjectId(),
  })
  _id: Types.ObjectId = new Types.ObjectId();

  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: String, required: true, default: 'To do' })
  status: string = 'To do';

  @ApiProperty()
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: false,
    default: [],
    ref: Employee.name,
  })
  assignedEmployees?: Types.ObjectId[] = [];
}

export class History {
  event: string;
  timestamp: Date;
}

@Schema()
export class Comment {
  constructor(
    employeeId: Types.ObjectId,
    comment: string,
    edited: boolean,
    date: Date,
  ) {
    this.employeeId = employeeId;
    this.comment = comment;
    this.edited = edited;
    this.date = date;
  }

  @ApiProperty()
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    default: new Types.ObjectId(),
  })
  _id: Types.ObjectId = new Types.ObjectId();

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Employee.name })
  employeeId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: String, required: true })
  comment: string;

  @ApiProperty()
  @Prop({ type: Boolean, required: true, default: false })
  edited: boolean = false;

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
    if (createJobDto.tags) this.tags = createJobDto.tags;
    if (createJobDto.priorityTag) this.priorityTag = createJobDto.priorityTag;
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
  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
    ref: Client.name,
    default: null,
  })
  clientId?: Types.ObjectId = null;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Employee.name })
  assignedBy: Types.ObjectId;

  @ApiProperty()
  @Prop({
    type: AssignedEmployees,
    required: false,
    default: new AssignedEmployees(), //Will this work?💀
  })
  assignedEmployees?: AssignedEmployees = new AssignedEmployees();

  @ApiProperty()
  @Prop({ type: String, required: true, default: 'To do' })
  status: string = 'To do';

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: false })
  column: Types.ObjectId;

  @ApiProperty()
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: false,
    ref: JobTag.name,
    default: [],
  })
  tags?: Types.ObjectId[] = [];

  @ApiProperty()
  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
    ref: JobTag.name,
    default: null,
  })
  priorityTag?: Types.ObjectId = null;

  @ApiProperty()
  @Prop({ type: String, required: false, default: null })
  attachments: string[];

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
  @Prop({ type: [History], required: true, default: [] })
  history: History[];

  @ApiProperty()
  @Prop({ type: [Comment], required: false, default: [] })
  comments?: Comment[] = [];

  @ApiProperty()
  @Prop({ required: false, default: new Date() })
  public createdAt: Date = new Date();

  @ApiProperty()
  @Prop({ required: false })
  public updatedAt: Date;

  @ApiProperty()
  @Prop({ required: false })
  public deletedAt?: Date;
}

export class JobApiObject {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  companyId: Types.ObjectId;

  @ApiProperty()
  clientId?: Types.ObjectId;

  @ApiProperty()
  assignedBy: Types.ObjectId;

  @ApiProperty()
  assignedEmployees?: AssignedEmployees;

  @ApiProperty()
  status: string = 'To do';

  @ApiProperty()
  tags?: Types.ObjectId[];

  @ApiProperty()
  priorityTag?: Types.ObjectId;

  @ApiProperty()
  attachments: string[];

  @ApiProperty()
  details: Details;

  @ApiProperty()
  recordedDetails?: RecordedDetails;

  @ApiProperty()
  clientFeedback?: ClientFeedback;

  @ApiProperty()
  taskList?: Task[];

  @ApiProperty()
  history: History[];

  @ApiProperty()
  comments?: Comment[];

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;
}

export class JobApiDetailedObject {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  company: Company;

  @ApiProperty()
  client?: Client;

  @ApiProperty()
  assignedBy: Employee;

  @ApiProperty()
  assignedEmployees?: AssignedEmployees;

  @ApiProperty()
  status: string = 'To do';

  @ApiProperty()
  tags?: Types.ObjectId[];

  @ApiProperty()
  priorityTag?: Types.ObjectId;

  @ApiProperty()
  attachments: string[];

  @ApiProperty()
  details: Details;

  @ApiProperty()
  recordedDetails?: RecordedDetails;

  @ApiProperty()
  clientFeedback?: ClientFeedback;

  @ApiProperty()
  taskList?: {
    name: string;
    status: string;
    assignedEmployees?: Employee[];
  };

  @ApiProperty()
  comments?: {
    employeeId: Employee;
    comment: string;
    date?: Date;
  }[];

  @ApiProperty()
  history: History[];

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

const defaultPopulatedFields = ['tags', 'priorityTag', 'history'];
const jobTasks = {
  path: 'taskList',
  populate: [
    {
      path: 'assignedEmployees',
      model: Employee.name,
    },
  ],
};
const jobAssignedEmployees = {
  path: 'assignedEmployees',
  populate: [
    {
      path: 'employeeIds',
      model: Employee.name,
    },
    {
      path: 'teamId',
      model: Team.name,
    },
  ],
};
const employeeComments = {
  path: 'comments',
  populate: [
    {
      path: 'employeeId',
      model: Employee.name,
    },
  ],
};

const autoPopulatedFields = function (next: any) {
  this.populate(defaultPopulatedFields);
  this.populate(jobTasks);
  this.populate(jobAssignedEmployees);
  this.populate(employeeComments);
  next();
};

JobSchema.pre('find', autoPopulatedFields)
  .pre('findOne', autoPopulatedFields)
  .pre('findOneAndUpdate', autoPopulatedFields);

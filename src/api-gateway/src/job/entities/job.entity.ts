import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { CreateJobDto } from '../dto/create-job.dto';
import { Client } from '../../client/entities/client.entity';
import { Company } from '../../company/entities/company.entity';
import { Employee } from '../../employee/entities/employee.entity';

export class Address {
  //They are optional for flexibility
  @Prop({ type: String, required: false })
  street?: string;
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
  address: Address;

  @ApiProperty()
  @Prop({ required: true })
  startDate: Date;

  @ApiProperty()
  @Prop({ required: true })
  endDate: Date;
}

export class InventoryUsed {
  @Prop({ type: Types.ObjectId, required: true })
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
    type: [Types.ObjectId],
    required: false,
    ref: Employee.name,
    default: [],
  })
  employeeIds?: Types.ObjectId[];
  @Prop({ type: Types.ObjectId, required: false /*, ref: Team.name*/ })
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
  @Prop({ type: [Types.ObjectId], required: false, default: [] })
  assignedEmployees?: Types.ObjectId[] = [];
}

export class Comment {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, required: true })
  employeeId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: String, required: true })
  comment: string;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, required: false, default: new Date() })
  date?: Date = new Date();
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
      /*      this.inventoryUsed = createJobDto.inventoryUsed.map(
        (item) => new Types.ObjectId(item),
      );*/
      this.details = {
        heading: createJobDto.details.heading,
        description: createJobDto.details.description,
        notes: createJobDto.details.notes,
        address: createJobDto.details.address,
        startDate: createJobDto.details.startDate,
        endDate: createJobDto.details.endDate,
      };

    //this.imagesTaken = createJobDto.imagesTaken;
    this.createdAt = new Date();
  }

  @ApiProperty()
  @Prop({ type: Types.ObjectId, required: true, ref: Company.name })
  companyId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, required: true, ref: Client.name })
  clientId: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: false, default: `Client-${Date.now()}` })
  clientUsername?: string;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, required: true, ref: Employee.name })
  assignedBy: Types.ObjectId;

  @ApiProperty()
  @Prop({
    type: AssignedEmployees,
    required: false,
    default: new AssignedEmployees(), //Will this work?💀
  })
  assignedEmployees?: AssignedEmployees;

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
  recordedDetails?: RecordedDetails;

  @ApiProperty()
  @Prop({ type: ClientFeedback, required: false })
  clientFeedback?: ClientFeedback;

  @ApiProperty()
  @Prop({ type: [Task], required: false })
  taskList?: Task[];

  @ApiProperty()
  @Prop({ type: [Comment], required: false })
  comments?: Comment[];

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

export const JobSchema = SchemaFactory.createForClass(Job);

//export const JobModel = getModelForClass(Job);

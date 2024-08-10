import { JobPriorityTag, JobPriorityTagApiObject, JobTag, JobTagObject } from '../entities/job-tag.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Employee } from '../../employee/entities/employee.entity';
import {
  AssignedEmployees,
  ClientFeedback,
  Comment,
  Details,
  History,
  Job,
  RecordedDetails,
  Task,
} from '../entities/job.entity';
import { JobStatus } from '../entities/job-status.entity';
import { Company } from '../../company/entities/company.entity';
import { Client } from '../../client/entities/client.entity';
export type JobTagWithId = JobTag & { _id: string };

export class JobResponseDto {
  constructor(data: JobApiObject) {
    this.data = data;
  }
  data: JobApiObject;
}

export class JobAllResponseDto {
  constructor(data: JobApiObject[]) {
    this.data = data;
  }
  data: JobApiObject[];
}

export class JobAllResponseDetailedDto {
  constructor(data: JobApiDetailedObject[]) {
    this.data = data;
  }
  data: JobApiDetailedObject[];
}

export class TagsAllResponseDto {
  @ApiProperty()
  data: JobTagWithId[];
}

export class TagResponseDto {
  @ApiProperty()
  data: JobTagWithId;
}

export class JobStatusResponseDto extends JobStatus {
  _id: Types.ObjectId;
}

export class JobStatusAllResponseDto extends JobStatus {
  data: JobStatusResponseDto[];
}

export class JobStatusApiObject {
  _id: Types.ObjectId;
  status: string;
  colour: string;
  companyId: Types.ObjectId;
}

export class PriorityTagsAllResponseDto {
  data: JobPriorityTag[];
}

class EmployeeWithId extends Employee {
  @ApiProperty()
  _id: Types.ObjectId;
}

export class AssignedEmployeesApiObject {
  employeeIds: EmployeeWithId[];
  teamIds: Types.ObjectId[];
}

export class JobApiObject {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  companyId: Types.ObjectId;

  @ApiProperty()
  clientId?: Types.ObjectId;

  @ApiProperty()
  assignedBy: Employee;

  @ApiProperty()
  assignedEmployees?: AssignedEmployeesApiObject;

  @ApiProperty()
  status: JobStatusApiObject | null;

  @ApiProperty()
  tags?: JobTagObject[];

  @ApiProperty()
  priorityTag?: JobPriorityTagApiObject;

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

export class JobTagResponseDto {
  data: Job & { _id: Types.ObjectId };
}

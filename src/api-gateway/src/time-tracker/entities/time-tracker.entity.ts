import { SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employee/entities/employee.entity';
import { Job } from '../../job/entities/job.entity';
import { currentDate } from '../../utils/Utils';
import { Company } from '../../company/entities/company.entity';

export class TimeInterval {
  constructor(start: Date) {
    this.start = start;
  }

  @ApiProperty()
  @Prop({ type: Date, required: true, default: null })
  start: Date;
  @ApiProperty()
  @Prop({ type: Date, required: false })
  end?: Date;
}

@Schema()
export class TimeTracker {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Employee.name, index: true })
  employeeId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Job.name, index: true })
  jobId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Company.name, index: true })
  companyId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: Date, required: true, default: currentDate() })
  checkInTime: Date;

  @ApiProperty()
  @Prop({ type: Date, required: false, default: null })
  checkOutTime?: Date = null;

  @ApiProperty()
  @Prop({ type: TimeInterval, required: true, default: [] })
  pauses: TimeInterval[] = [];

  @ApiProperty()
  @Prop({ type: Date, required: true, default: currentDate() })
  createdAt: Date = currentDate();
}

export const TimeTrackerSchema = SchemaFactory.createForClass(TimeTracker);

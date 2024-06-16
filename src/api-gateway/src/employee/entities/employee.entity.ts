import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { PickType } from '@nestjs/mapped-types';
import { Job } from '../../job/entities/job.entity';

@Schema()
export class Employee {

  @ApiProperty()
  @Prop({ required: false })
  roleId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], required: true, default: [] })
  currentJobAssignments: Types.ObjectId[];
   
  @ApiProperty()
  @Prop({ required: false })
  superiorId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], required: false, default: [] })
  subordinates: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], required: false, default: [] })
  subordinateTeams: Types.ObjectId[];

  @ApiProperty()
  @Prop({ required: true })
  userId: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: true })
  companyId: Types.ObjectId;

  @ApiHideProperty()
  @Prop({ required: true, default: new Date() })
  public createdAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public updatedAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public deletedAt: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

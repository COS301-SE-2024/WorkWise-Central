import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { CreateEmployeeDto } from '../dto/create-employee.dto';

@Schema()
export class Employee {
  constructor(createEmployeeDto: CreateEmployeeDto) {
    // this.superiorId = createEmployeeDto.superiorId;
    // this.roleId = createEmployeeDto.roleId;
    this.userId = createEmployeeDto.userId;
    this.companyId = createEmployeeDto.companyId;
    this.createdAt = new Date();
  }

  @ApiProperty()
  @Prop({ required: false })
  roleId?: Types.ObjectId; //TODO: Make this field required

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], required: true, default: [] })
  currentJobAssignments?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ required: false })
  superiorId?: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], required: false, default: [] })
  subordinates?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], required: false, default: [] })
  subordinateTeams?: Types.ObjectId[];

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

export class EmployeeApiObject {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  id: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: false })
  roleId?: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], required: true, default: [] })
  currentJobAssignments?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ required: false })
  superiorId?: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], required: false, default: [] })
  subordinates?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], required: false, default: [] })
  subordinateTeams?: Types.ObjectId[];

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

export class EmployeeListResponseDto {
  constructor(data: EmployeeApiObject[]) {
    this.data = data;
  }
  data: EmployeeApiObject[];
}

export class EmployeeResponseDto {
  constructor(data: EmployeeApiObject) {
    this.data = data;
  }
  data: EmployeeApiObject;
}

export class BooleanResponseDto {
  data: boolean;
}

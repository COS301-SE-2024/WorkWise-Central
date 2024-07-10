import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';
// import mongoose, { SchemaTypes, Types } from 'mongoose';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
// import { Role } from 'src/role/entity/role.entity';
// import { Team } from 'src/team/entities/team.entity';
// import { Job } from 'src/job/entities/job.entity';
// // import { User } from 'src/users/entities/user.entity';
// import { Company } from 'src/company/entities/company.entity';

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
  @Prop({ type: [SchemaTypes.ObjectId], required: false, ref: 'Role' })
  roleId?: Types.ObjectId;

  @ApiProperty()
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: true,
    default: [],
    ref: 'Job',
  })
  currentJobAssignments?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: false, ref: 'Employee' })
  superiorId?: Types.ObjectId;

  @ApiProperty()
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: false,
    default: [],
    ref: Employee.name,
  })
  subordinates?: Types.ObjectId[];

  @ApiProperty()
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: false,
    default: [],
    ref: 'Team',
  })
  subordinateTeams?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: true, ref: 'User' })
  userId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: true, ref: 'Company' })
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
  @Prop({ type: [SchemaTypes.ObjectId], required: true, unique: true })
  id: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: false })
  roleId?: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: true, default: [] })
  currentJobAssignments?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: false })
  superiorId?: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: false, default: [] })
  subordinates?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: false, default: [] })
  subordinateTeams?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: true })
  userId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: true })
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

export class joinedEmployeeApiObject {
  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: true, unique: true })
  id: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: Object, required: false })
  roleId?: object;

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: true, default: [] })
  currentJobAssignments?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: false })
  superiorId?: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: false, default: [] })
  subordinates?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: Object, required: false, default: [] })
  subordinateTeams?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: Object, required: true })
  userId: object;

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: true })
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

export class joinedEmployeeListResponseDto {
  constructor(data: joinedEmployeeApiObject[]) {
    this.data = data;
  }
  data: joinedEmployeeApiObject[];
}

export class EmployeeResponseDto {
  constructor(data: EmployeeApiObject) {
    this.data = data;
  }
  data: EmployeeApiObject;
}

export class joinedEmployeeResponseDto {
  constructor(data: joinedEmployeeApiObject) {
    this.data = data;
  }
  data: joinedEmployeeApiObject;
}

export class BooleanResponseDto {
  data: boolean;
}

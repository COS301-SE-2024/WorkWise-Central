import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { currentDate } from '../../utils/Utils';
import { Role } from 'src/role/entity/role.entity';

export class userInfo {
  @ApiProperty()
  @Prop({ type: String, required: true })
  username: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  firstName: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  surname: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  displayName: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  displayImage: string;
}

export class roleObject {
  @ApiProperty()
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: Role.name,
  })
  roleId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [String], required: true })
  permissionSuite: string[];
}
@Schema()
export class Employee {
  constructor(createEmployeeDto: CreateEmployeeDto) {
    this.userId = createEmployeeDto.userId;
    this.companyId = createEmployeeDto.companyId;
    this.createdAt = currentDate();
  }

  @ApiProperty()
  @Prop({ required: true })
  role: roleObject;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: false, ref: 'Employee' })
  superiorId?: Types.ObjectId;

  @ApiProperty()
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: true,
    default: [],
    ref: Employee.name,
  })
  subordinates?: Types.ObjectId[];

  @ApiProperty()
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: true,
    default: [],
    ref: 'Team',
  })
  subordinateTeams?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: true })
  userInfo: userInfo;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Company' })
  companyId: Types.ObjectId;

  @ApiProperty()
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: true,
    default: [],
    ref: 'Job',
  })
  jobAssignments?: Types.ObjectId[];

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
  @Prop({ type: SchemaTypes.ObjectId, required: true, unique: true })
  id: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: true })
  role: roleObject;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: false, ref: 'Employee' })
  superiorId?: Types.ObjectId;

  @ApiProperty()
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: true,
    default: [],
    ref: Employee.name,
  })
  subordinates?: Types.ObjectId[];

  @ApiProperty()
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: true,
    default: [],
    ref: 'Team',
  })
  subordinateTeams?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: true })
  userInfo: userInfo;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Company' })
  companyId: Types.ObjectId;

  @ApiProperty()
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: true,
    default: [],
    ref: 'Job',
  })
  currentJobAssignments?: Types.ObjectId[];

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
  @Prop({ type: SchemaTypes.ObjectId, required: true, unique: true })
  id: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: Object, required: false })
  roleId?: object;

  // @ApiProperty()
  // @Prop({ type: [SchemaTypes.ObjectId], required: true, default: [] })
  // currentJobAssignments?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: false })
  superiorId?: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: false, default: [] })
  subordinates?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: false, default: [] })
  subordinateTeams?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: Object, required: true })
  userId: object;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true })
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

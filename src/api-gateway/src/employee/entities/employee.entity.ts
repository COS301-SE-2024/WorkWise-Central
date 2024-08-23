import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';
import { Role } from '../../role/entity/role.entity';
import { User } from '../../users/entities/user.entity';

export class UserInfo {
  @ApiProperty()
  @Prop({ type: String, required: false })
  username?: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  firstName?: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  surname?: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  displayName?: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  displayImage?: string;
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

  @ApiProperty()
  @Prop({ type: String, required: true })
  roleName: string;
}
@Schema()
export class Employee {
  @ApiProperty()
  @Prop({ type: roleObject, required: true, default: new roleObject() })
  role: roleObject = new roleObject();

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
  teams?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: false })
  userInfo?: UserInfo = new UserInfo();

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

  @ApiProperty()
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: true,
    default: [],
    ref: 'Job',
  })
  currentTaskAssignments?: Types.ObjectId[];

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
  @Prop({ required: false })
  userInfo: UserInfo;

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
  role?: roleObject;

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
  userId: User;

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

export class Node {
  @ApiProperty()
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, unique: true })
  id: Types.ObjectId;
}

export class Edge {
  @ApiProperty()
  @Prop({ type: String, required: true, unique: true })
  source: string;

  @ApiProperty()
  @Prop({ type: String, required: true, unique: true })
  target: string;
}

export class Nodes {
  @ApiProperty()
  @Prop({ type: Node, required: true, unique: true })
  node1: Node;
}

export class Edges {
  @ApiProperty()
  @Prop({ type: Edge, required: true, unique: true })
  edge1: Edge;
}

export class Graph {
  @ApiProperty()
  @Prop({ type: { Nodes }, required: true, unique: true })
  nodes: Nodes;

  @ApiProperty()
  @Prop({ type: { Edges }, required: true, unique: true })
  edges: Edges;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

export class EmployeeListResponseDto {
  constructor(data: EmployeeApiObject[]) {
    this.data = data;
  }
  data: EmployeeApiObject[];
}

export class GraphResponseDto {
  constructor(data: Graph) {
    this.data = data;
  }
  data: Graph;
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

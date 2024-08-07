import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';
import { CreateRoleDto } from '../dto/create-role.dto';

@Schema()
export class Role {
  constructor(createRoleDto: CreateRoleDto) {
    this.roleName = createRoleDto.roleName;
    this.companyId = createRoleDto.companyId;
    this.createdAt = new Date();
  }

  @ApiProperty()
  @Prop({ type: String, required: true })
  roleName: string;

  @ApiProperty()
  @Prop({
    type: [String],
    required: true,
    default: ['view all jobs assigned to me', 'view all clients that are assigned to me', 'record inventory use'],
  })
  permissionSuite: string[];

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  companyId: Types.ObjectId;

  @ApiHideProperty()
  @Prop({ type: Date, required: true, default: new Date() })
  public createdAt: Date;

  @ApiHideProperty()
  @Prop({ type: Date, required: false })
  public updatedAt?: Date;

  @ApiHideProperty()
  @Prop({ type: Date, required: false })
  public deletedAt?: Date;
}

export class RoleApiObject {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, unique: true })
  id: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: String, required: true })
  roleName: string;

  @ApiProperty()
  @Prop({
    type: [String],
    required: true,
    default: ['view all jobs assigned to me', 'view all clients that are assigned to me', 'record inventory use'],
  })
  permissionSuite: string[];

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  companyId: Types.ObjectId;

  @ApiHideProperty()
  @Prop({ type: Date, required: true, default: new Date() })
  public createdAt: Date;

  @ApiHideProperty()
  @Prop({ type: Date, required: false })
  public updatedAt?: Date;

  @ApiHideProperty()
  @Prop({ type: Date, required: false })
  public deletedAt?: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

export class RoleListResponseDto {
  constructor(data: RoleApiObject[]) {
    this.data = data;
  }
  data: RoleApiObject[];
}

export class RoleResponseDto {
  constructor(data: RoleApiObject) {
    this.data = data;
  }
  data: RoleApiObject;
}

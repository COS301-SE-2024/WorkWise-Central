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
  @Prop({ required: true })
  roleName: string;

  @ApiProperty()
  @Prop({ type: [String], required: false, default: [] })
  permissionSuite: string[];

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

export class RoleApiObject {
  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: true, unique: true })
  id: Types.ObjectId;
  @ApiProperty()
  @Prop({ required: true })
  roleName: string;

  @ApiProperty()
  @Prop({ type: [String], required: false, default: [] })
  permissionSuite: string[];

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

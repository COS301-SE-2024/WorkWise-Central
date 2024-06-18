import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { CreateRoleDto } from '../dto/create-role.dto';

@Schema()
export class Role {
  constructor(createRoleDto: CreateRoleDto) {
    // this.superiorId = createRoleDto.superiorId;
    // this.roleId = createRoleDto.roleId;
    this.userId = createRoleDto.userId;
    this.companyId = createRoleDto.companyId;
    this.createdAt = new Date();
  }

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
  subordinateRoles: Types.ObjectId[];

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

export const RoleSchema = SchemaFactory.createForClass(Role);

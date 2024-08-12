import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Role } from '../../role/entity/role.entity';
import { currentDate } from '../../utils/Utils';
import { Transform } from 'class-transformer';
import { Employee } from '../../employee/entities/employee.entity';

const ONEWEEK = 604800;

@Schema({ timestamps: true })
export class InviteToJoin {
  constructor(
    companyId: Types.ObjectId,
    companyName: string,
    roleIdForInvite: Types.ObjectId,
    roleName: string,
    emailBeingInvited: string,
  ) {
    this.companyId = companyId;
    this.companyName = companyName;
    this.roleIdForInvite = roleIdForInvite;
    this.roleName = roleName;
    this.emailBeingInvited = emailBeingInvited;
    this.createdAt = currentDate();
  }

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Company' })
  companyId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Employee.name })
  superiorId: Types.ObjectId;

  @Prop({ type: String, required: true })
  companyName: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: Role.name,
  })
  roleIdForInvite: Types.ObjectId;

  @Prop({ type: String, required: true, default: 'Worker' })
  roleName: string = 'Worker';

  @Prop({ type: String, required: true, lowercase: true })
  @Transform((param) => param.value.toUpperCase())
  emailBeingInvited: string;

  @Prop({ required: true, type: Date, default: currentDate() })
  createdAt: Date = new Date();
}

export const InviteToJoinSchema = SchemaFactory.createForClass(InviteToJoin);

InviteToJoinSchema.index({ createdAt: 1 }, { expireAfterSeconds: ONEWEEK });

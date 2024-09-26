import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../role/entity/role.entity';
import { currentDate } from '../../utils/Utils';
import { Company } from '../../company/entities/company.entity';

const ONEWEEK = 604800;

@Schema({ timestamps: true })
export class UserJoinRequest {
  constructor(
    companyId: Types.ObjectId,
    roleId: Types.ObjectId,
    userToJoin: Types.ObjectId,
    companyName?: string,
    roleName?: string,
  ) {
    this.companyId = companyId;
    this.roleId = roleId;
    this.userToJoin = userToJoin;
    if (companyName) this.companyName = companyName;
    if (roleName) this.roleName = roleName;
  }

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: Company.name })
  companyId: Types.ObjectId;

  @Prop({ required: false, type: String })
  companyName?: string;

  @Prop({ required: false, type: String })
  roleName?: string;

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: Role.name,
    default: null,
  })
  roleId: Types.ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  userToJoin: Types.ObjectId;

  @Prop({ required: true, type: Date, default: currentDate() })
  createdAt: Date = new Date();
}

export const UserJoinRequestSchema = SchemaFactory.createForClass(UserJoinRequest);

UserJoinRequestSchema.index({ createdAt: 1 }, { expireAfterSeconds: ONEWEEK });

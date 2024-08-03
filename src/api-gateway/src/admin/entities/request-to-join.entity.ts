import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { CreateUserRequestDto } from '../../users/dto/create-user-request.dto';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../role/entity/role.entity';
import { currentDate } from '../../utils/Utils';

const ONEWEEK = 604800;

@Schema({ timestamps: true })
export class UserJoinRequest {
  constructor(createRequestDto: CreateUserRequestDto) {
    if (createRequestDto.companyId) this.companyId = createRequestDto.companyId;
    if (createRequestDto.companyName)
      this.companyName = createRequestDto.companyName;
    this.userToJoin = createRequestDto.userToJoin;
  }

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: 'Company' })
  companyId: Types.ObjectId;

  @Prop({ required: false, type: String })
  companyName?: string;

  @Prop({
    required: false,
    type: SchemaTypes.ObjectId,
    ref: Role.name,
    default: null,
  })
  roleId?: Types.ObjectId = null; //Still not sure about this...

  @Prop({ required: true, type: String, default: 'Worker' }) //TODO: Fix
  roleName?: string = 'Worker';

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  userToJoin: Types.ObjectId;

  @Prop({ required: true, type: Date, default: currentDate() })
  createdAt: Date = new Date();
}

export const UserJoinRequestSchema =
  SchemaFactory.createForClass(UserJoinRequest);

UserJoinRequestSchema.index({ createdAt: 1 }, { expireAfterSeconds: ONEWEEK });

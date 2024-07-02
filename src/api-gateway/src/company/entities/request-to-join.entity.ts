import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { CreateUserRequestDto } from '../../users/dto/create-user-request.dto';

@Schema()
export class UserRequestToJoin {
  constructor(createRequestDto: CreateUserRequestDto) {
    if (createRequestDto.companyId) this.companyId = createRequestDto.companyId;
    if (createRequestDto.companyName)
      this.companyName = createRequestDto.companyName;
    this.userToJoin = createRequestDto.userToJoin;
  }

  @Prop({ required: false, type: Types.ObjectId, ref: 'Company' })
  companyId?: Types.ObjectId;

  @Prop({ required: false, type: String })
  companyName?: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Users' })
  userToJoin: Types.ObjectId;

  @Prop({ required: true, type: Date, default: new Date() })
  createdAt: Date = new Date();
}

export const UserRequestToJoinSchema =
  SchemaFactory.createForClass(UserRequestToJoin);

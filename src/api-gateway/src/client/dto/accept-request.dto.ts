import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { Types } from 'mongoose';

export class AcceptRequestDto {
  @IsObjectId()
  companyId: Types.ObjectId;

  @IsObjectId()
  userToJoinId: Types.ObjectId;

  @IsObjectId()
  superiorId: Types.ObjectId;

  @IsOptional()
  @IsMongoId({ each: true })
  subordinates?: Types.ObjectId[] = [];

  @IsNotEmpty()
  @IsBoolean()
  accept: boolean;

  @IsOptional()
  @IsObjectId()
  assignedRoleId?: Types.ObjectId;
}

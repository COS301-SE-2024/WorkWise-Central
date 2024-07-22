import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserRequestDto {
  @IsOptional()
  @IsMongoId()
  companyId?: Types.ObjectId;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsMongoId()
  userToJoin?: Types.ObjectId;
}

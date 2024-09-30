import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AddCommentDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  newComment: string;
}

export class RemoveCommentDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  commentId: Types.ObjectId;
}

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  commentId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  comment: string;
}

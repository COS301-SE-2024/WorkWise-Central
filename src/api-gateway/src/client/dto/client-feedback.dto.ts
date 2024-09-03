import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ClientFeedbackDto {
  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;
  @IsNotEmpty()
  @IsMongoId()
  clientId: Types.ObjectId;
  @IsOptional()
  @IsNumber()
  jobRating?: number;
  @IsOptional()
  @IsNumber()
  customerServiceRating?: number;
  @IsOptional()
  @IsString()
  comments?: string;
}

import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Types } from 'mongoose';

export class ClientFeedbackDto {
  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;
  @IsNotEmpty()
  @IsMongoId()
  clientId: Types.ObjectId;
  @IsOptional()
  @IsString()
  clientName?: string;
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  jobRating?: number;
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  customerServiceRating?: number;
  @IsOptional()
  @IsString()
  comments?: string;
}

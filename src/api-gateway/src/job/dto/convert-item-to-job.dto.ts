import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class ConvertItemToJobDto {
  @IsNotEmpty()
  @IsMongoId()
  currentEmployeeId: Types.ObjectId;
  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;
  @IsNotEmpty()
  @IsMongoId()
  taskId: Types.ObjectId;
  @IsNotEmpty()
  @IsMongoId()
  taskItemId: Types.ObjectId;
}

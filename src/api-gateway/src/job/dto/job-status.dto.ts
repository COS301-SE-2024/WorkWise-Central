import { IsHexColor, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { AddHashtag } from '../../utils/Custom Transformers/add-hashtag.transformer';

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  statusId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  @IsHexColor()
  @AddHashtag()
  colour: string;
}

export class UpdateStatus {
  constructor(updateStatusDto: UpdateStatusDto) {
    this.status = updateStatusDto.status;
    this.colour = updateStatusDto.colour;
  }

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  @IsHexColor()
  @AddHashtag()
  colour: string;
}

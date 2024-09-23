import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsedInventory {
  @IsNotEmpty()
  @IsMongoId()
  inventoryId: Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  amountUsed: number;
}

export class UpdateUsedInventory {
  @IsNotEmpty()
  @IsMongoId()
  inventoryUsedId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  inventoryId: Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  changeInAmount: number;
}

export class ListOfUsedInventory {
  @IsNotEmpty()
  @IsMongoId()
  currentEmployeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  companyId: Types.ObjectId;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  listOfUsedInventory: UsedInventory[];
}

export class ListOfUpdatesForUsedInventory {
  @IsNotEmpty()
  @IsMongoId()
  currentEmployeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  listOfUsedInventory: UpdateUsedInventory[];
}

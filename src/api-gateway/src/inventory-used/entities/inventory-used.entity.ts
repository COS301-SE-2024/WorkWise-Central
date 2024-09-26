import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';
import { CreateInventoryUsedDto } from '../dto/create-inventory-used.dto';

@Schema()
export class InventoryUsed {
  constructor(createInventoryDto: CreateInventoryUsedDto) {
    this.companyId = createInventoryDto.companyId;
    this.inventoryId = createInventoryDto.inventoryId;
    this.jobId = createInventoryDto.jobId;
    this.employeeId = createInventoryDto.employeeId;
    this.amount = createInventoryDto.amount;
    this.createdAt = new Date();
  }

  @ApiProperty()
  @Prop({ type: Number, required: true })
  amount: number;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Company' })
  companyId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Inventory' })
  inventoryId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Job' })
  jobId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Employee' })
  employeeId: Types.ObjectId;

  @ApiHideProperty()
  @Prop({ required: true, default: new Date() })
  public createdAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public updatedAt?: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public deletedAt?: Date;
}

export class InventoryUsedApiObject {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, unique: true })
  id: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  amount: number;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Company' })
  companyId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Inventory' })
  inventoryId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Job' })
  jobId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Employee' })
  employeeId: Types.ObjectId;

  @ApiHideProperty()
  @Prop({ required: true, default: new Date() })
  public createdAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public updatedAt?: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public deletedAt?: Date;
}

export const InventoryUsedSchema = SchemaFactory.createForClass(InventoryUsed);

export class InventoryUsedListResponseDto {
  constructor(data: InventoryUsedApiObject[]) {
    this.data = data;
  }
  data: InventoryUsedApiObject[];
}

export class InventoryResponseDto {
  constructor(data: InventoryUsedApiObject) {
    this.data = data;
  }
  data: InventoryUsedApiObject;
}

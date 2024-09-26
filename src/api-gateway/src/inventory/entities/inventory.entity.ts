import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';
import { CreateInventoryDto } from '../dto/create-inventory.dto';

@Schema()
export class Inventory {
  constructor(createInventoryDto: CreateInventoryDto) {
    this.name = createInventoryDto.name;
    this.description = createInventoryDto.description;
    this.costPrice = createInventoryDto.costPrice;
    this.currentStockLevel = createInventoryDto.currentStockLevel;
    this.reorderLevel = createInventoryDto.reorderLevel;
    this.companyId = createInventoryDto.companyId;
    if (createInventoryDto.companyId) this.companyId = createInventoryDto.companyId;
    this.createdAt = new Date();
    //Should add an image field, not sure how to deal with it yet
  }

  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  description?: string;

  @ApiProperty()
  @Prop({ type: Number, required: false })
  costPrice?: number;

  @ApiProperty()
  @Prop({ type: Number, required: false })
  salePrice?: number;

  @ApiProperty()
  @Prop({ type: Number, required: false, default: 0 })
  currentStockLevel?: number;

  @ApiProperty()
  @Prop({
    type: [String],
    required: false,
    default: [],
  })
  images?: string[] = [];

  @ApiProperty()
  @Prop({ type: Number, required: false })
  reorderLevel?: number;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Company' })
  companyId: Types.ObjectId;

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

export class InventoryApiObject {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, unique: true })
  id: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  description?: string;

  @ApiProperty()
  @Prop({ type: Number, required: false })
  costPrice?: number;

  @ApiProperty()
  @Prop({ type: Number, required: false, default: 0 })
  currentStockLevel?: number;

  @ApiProperty()
  @Prop({
    type: [String],
    required: false,
    default: [],
  })
  images?: string[] = [];

  @ApiProperty()
  @Prop({ type: Number, required: false })
  reorderLevel?: number;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Company' })
  companyId: Types.ObjectId;

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

export const InventorySchema = SchemaFactory.createForClass(Inventory);

export class InventoryListResponseDto {
  constructor(data: InventoryApiObject[]) {
    this.data = data;
  }
  data: InventoryApiObject[];
}

export class InventoryResponseDto {
  constructor(data: InventoryApiObject) {
    this.data = data;
  }
  data: InventoryApiObject;
}

export class InventoryUsedResponseDto {
  data: InventoryApiObject;
}

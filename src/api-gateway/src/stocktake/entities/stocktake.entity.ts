import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';

export class InventoryItem {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Inventory' })
  inventoryId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;
}
export class StockTakeItem {
  @ApiProperty()
  @Prop({ type: Number, required: true })
  currentStockLevel: number;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  recordedStockLevel: number;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  inventoryItem: InventoryItem;
}

@Schema()
export class StockTake {
  @ApiProperty()
  @Prop({ type: Date, required: true, default: new Date() })
  date: Date;

  @ApiProperty()
  @Prop({ type: [StockTakeItem], required: true })
  items: StockTakeItem[];

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Company' })
  companyId: Types.ObjectId;

  @ApiHideProperty()
  @Prop({ required: true, default: new Date() })
  public createdAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public updatedAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public deletedAt: Date;
}
export class StockTakeApiObject {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, unique: true })
  id: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: Date, required: true })
  date: Date;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  currentStockLevel: number;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  recordedStockLevel: number;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  inventoryItem: Types.ObjectId;

  @ApiHideProperty()
  @Prop({ required: true, default: new Date() })
  public createdAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public updatedAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public deletedAt: Date;
}

export const StockTakeSchema = SchemaFactory.createForClass(StockTake);

export class StockTakeListResponseDto {
  constructor(data: StockTakeApiObject[]) {
    this.data = data;
  }
  data: StockTakeApiObject[];
}

export class StockTakeResponseDto {
  constructor(data: StockTakeApiObject) {
    this.data = data;
  }
  data: StockTakeApiObject;
}

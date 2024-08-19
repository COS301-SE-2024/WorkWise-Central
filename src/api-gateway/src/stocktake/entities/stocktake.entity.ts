import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';
import { CreateStocktakeDto } from '../dto/create-stocktake.dto';

export class StockTakeItem {
  @ApiProperty()
  @Prop({ type: Number, required: true })
  currentStockLevel: number;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  recordedStockLevel: number;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  inventoryId: Types.ObjectId;
}

@Schema()
export class StockTake {
  constructor(createStocktakeDto: CreateStocktakeDto) {
    this.date = createStocktakeDto.date;
    this.companyId = createStocktakeDto.companyId;
    this.createdAt = new Date();
  }
  @ApiProperty()
  @Prop({ type: Date, required: true })
  date: Date;

  @ApiProperty()
  @Prop({ type: [StockTakeItem], required: true })
  items: StockTakeItem[];

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true })
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

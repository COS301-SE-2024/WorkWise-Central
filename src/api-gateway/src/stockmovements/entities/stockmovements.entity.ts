import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';

export class InventoryItem {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Inventory' })
  inventoryId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: String, required: false })
  nameOfItem: string;
}

export class EmployeeDetails {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Employee' })
  employeeId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: String, required: false })
  username?: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  firstName?: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  surname?: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  displayName?: string;
}

@Schema()
export class StockMovements {
  @ApiProperty()
  @Prop({ type: String, required: true })
  reason: string;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  movement: number;

  @ApiProperty()
  @Prop({ type: EmployeeDetails, required: true })
  employee: EmployeeDetails;

  @ApiProperty()
  @Prop({ type: InventoryItem, required: true })
  inventoryItem: InventoryItem;

  @ApiHideProperty()
  @Prop({ required: true, default: new Date() })
  movementDate: Date;

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

export class StockMovementsApiObject {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, unique: true })
  id: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: String, required: true })
  reason: string;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  movement: number;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Employee' })
  employee: EmployeeDetails;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Inventory' })
  inventoryItem: InventoryItem;

  @ApiHideProperty()
  @Prop({ required: true, default: new Date() })
  movementDate: Date;

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

export const StockMovementsSchema = SchemaFactory.createForClass(StockMovements);

export class StockMovementsListResponseDto {
  constructor(data: StockMovementsApiObject[]) {
    this.data = data;
  }
  data: StockMovementsApiObject[];
}

export class StockMovementsResponseDto {
  constructor(data: StockMovementsApiObject) {
    this.data = data;
  }
  data: StockMovementsApiObject;
}

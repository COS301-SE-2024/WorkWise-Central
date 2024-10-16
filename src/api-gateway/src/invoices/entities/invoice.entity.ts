import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';

export class Items {
  @ApiProperty()
  @Prop({ type: String, required: true })
  description: string;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  quantity: number;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  unitPrice: number;

  @ApiProperty()
  @Prop({ type: Number, required: false })
  discount: number;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  total: number;
}

@Schema()
export class Invoice {
  constructor(createInvoiceDto: CreateInvoiceDto) {
    this.invoiceNumber = createInvoiceDto.invoiceNumber ? createInvoiceDto.invoiceNumber : 0;
    this.invoiceDate = createInvoiceDto.invoiceDate ? createInvoiceDto.invoiceDate : new Date();
    this.subTotal = createInvoiceDto.subTotal ? createInvoiceDto.subTotal : 0;
    this.total = createInvoiceDto.total ? createInvoiceDto.total : 0;
    this.taxAmount = createInvoiceDto.taxAmount ? createInvoiceDto.taxAmount : 0;
    this.taxPercentage = createInvoiceDto.taxPercentage ? createInvoiceDto.taxPercentage : 0;
    this.paid = false;
    this.clientId = createInvoiceDto.clientId;
    this.jobId = createInvoiceDto.jobId;
    this.companyId = createInvoiceDto.companyId;
    this.createdAt = new Date();
    this.sent = false;
  }

  @ApiProperty()
  @Prop({ type: Number, required: true })
  invoiceNumber: number;

  @ApiProperty()
  @Prop({ required: true, default: new Date() })
  invoiceDate: Date;

  @ApiProperty()
  @Prop({ required: true, default: new Date() })
  paymentDate: Date;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  subTotal: number;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  total: number;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  taxAmount: number;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  taxPercentage: number;

  @ApiProperty()
  @Prop({ type: Boolean, required: true, default: false })
  paid: boolean;

  @ApiProperty()
  @Prop({ required: true, default: new Date() })
  receiptOfPaymentDate: Date;

  @ApiProperty()
  @Prop({ type: Boolean, required: true, default: false })
  sent: boolean;

  @ApiProperty()
  @Prop({ required: false })
  sentDate: Date;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Client' })
  clientId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Job' })
  jobId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Company' })
  companyId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [Items], required: true })
  inventoryItems: Items[];

  @ApiProperty()
  @Prop({ type: [Items], required: true })
  laborItems: Items[];

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

export class InvoiceApiObject {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, unique: true })
  id: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  invoiceNumber: number;

  @ApiProperty()
  @Prop({ required: true, default: new Date() })
  invoiceDate: Date;

  @ApiProperty()
  @Prop({ required: true, default: new Date() })
  paymentDate: Date;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  subTotal: number;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  total: number;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  tax: number;

  @ApiProperty()
  @Prop({ type: Boolean, required: true, default: false })
  paid: boolean;

  @ApiProperty()
  @Prop({ required: true, default: new Date() })
  receiptOfPaymentDate: Date;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Client' })
  clientId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Job' })
  jobId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Job' })
  companyId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [Items], required: true })
  inventoryItems: Items[];

  @ApiProperty()
  @Prop({ type: [Items], required: true })
  laborItems: Items[];

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

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);

export class InvoiceListResponseDto {
  constructor(data: InvoiceApiObject[]) {
    this.data = data;
  }
  data: InvoiceApiObject[];
}

export class InvoiceResponseDto {
  constructor(data: InvoiceApiObject) {
    this.data = data;
  }
  data: InvoiceApiObject;
}

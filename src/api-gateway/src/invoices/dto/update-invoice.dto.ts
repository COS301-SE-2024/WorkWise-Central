import { Types } from 'mongoose';
import { IsArray, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Items {
  @IsOptional()
  @ApiProperty()
  @IsString()
  description?: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  unitPrice?: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  total?: number;
}

export class UpdateInvoiceDto {
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  invoiceNumber?: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  invoiceDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  paymentDate?: Date;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  subTotal?: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  total?: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  taxAmount?: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  taxPercentage?: number;

  @ApiProperty()
  @IsOptional()
  paid?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  receiptOfPaymentDate?: Date;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  inventoryItems?: Items[];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  laborItems?: Items[];
}

export class ExternalInvoiceUpdateDto {
  currentEmployeeId: Types.ObjectId;

  updateInvoiceDto: UpdateInvoiceDto;
}

export class updateInvoiceResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}

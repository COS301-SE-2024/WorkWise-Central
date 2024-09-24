import { Types } from 'mongoose';
import { IsArray, IsDateString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Items } from './create-invoice.dto';

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
  paymentReceivedDate?: Date;

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

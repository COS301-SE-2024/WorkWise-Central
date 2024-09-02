import { Types } from 'mongoose';
import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { items } from './create-invoice.dto';

export class UpdateInvoiceDto {
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  invoiceNumber: number;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  invoiceDate: Date;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  subTotal: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  total: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  tax: number;

  @ApiProperty()
  @IsOptional()
  paid?: boolean;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  clientId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  jobId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  companyId: Types.ObjectId;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  items: items[];
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

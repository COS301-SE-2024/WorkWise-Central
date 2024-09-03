import { Types } from 'mongoose';
import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  IsArray,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class items {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  item: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  unitPrice: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  discount: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  total: number;
}

export class CreateInvoiceDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  invoiceNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  invoiceDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  subTotal: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
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

export class CreateInvoiceOuterDto {
  @IsNotEmpty()
  @IsMongoId()
  currentEmployeeId: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested()
  createInvoiceDto: CreateInvoiceDto;
}

export class CreateInvoiceResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}

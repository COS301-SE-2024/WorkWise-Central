import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  //IsPhoneNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Client } from '../entities/client.entity';
import { Types } from 'mongoose';

export class ContactInfo {
  @ApiProperty()
  @IsOptional()
  @IsString()
  //@Transform(({ value }) => (value.startsWith('0') ? `+27${value.slice(1)}` : value))
  //@IsPhoneNumber(null)
  phoneNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email?: string;
}

export class Address {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  province: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  suburb: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(20)
  postalCode: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  complexOrBuilding?: string;
}

export class ClientDetails {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  preferredLanguage?: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => ContactInfo)
  contactInfo: ContactInfo;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => Address)
  address?: Address;

  @ApiProperty()
  @IsOptional()
  @IsString()
  vatNumber?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  companyId: Types.ObjectId;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  idNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  type?: string;
}

export class CreateClientDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  companyId?: Types.ObjectId;

  @ApiProperty()
  @IsOptional()
  @IsString()
  registrationNumber?: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ClientDetails)
  details: ClientDetails;
}

export class findClientResponseDto {
  data: Client[];
}

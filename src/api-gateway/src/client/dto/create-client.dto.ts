import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Client } from '../entities/client.entity';
import { Types } from 'mongoose';

class ContactInfo {
  @ApiProperty()
  @IsString()
  @Transform(({ value }) =>
    value.startsWith('0') ? `+27${value.slice(1)}` : value,
  )
  @IsPhoneNumber(null)
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;
}

class Address {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  street: string;

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
  complex?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  @MaxLength(255)
  houseNumber?: string;
}

export class ClientDetails {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

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
  @IsOptional()
  @IsMongoId()
  companyId?: Types.ObjectId;

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
  @IsOptional()
  @IsMongoId()
  registrationNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  clientUsername?: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ClientDetails)
  details: ClientDetails;
}

export class findClientResponseDto {
  data: Client[];
}

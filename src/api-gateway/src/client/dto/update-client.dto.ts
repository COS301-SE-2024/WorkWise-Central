import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';

class ContactInfo {
  @ApiProperty()
  @IsString()
  @Transform(({ value }) =>
    value.startsWith('0') ? `+27${value.slice(1)}` : value,
  )
  //@IsPhoneNumber(null)
  phoneNumber?: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email?: string;
}
class UpdateContactInfo extends PartialType(ContactInfo) {}
class Address {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  street?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  province?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  suburb?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  city?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  @MaxLength(20)
  postalCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  complex?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  houseNumber?: string;
}
class UpdateAddress extends PartialType(Address) {}
class ClientDetails {
  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  preferredLanguage?: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateContactInfo)
  contactInfo?: UpdateContactInfo;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddress)
  address?: UpdateAddress;

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
class UpdateClientDetails extends PartialType(ClientDetails) {}

export class UpdateClientDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  registrationNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  clientUsername?: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateClientDetails)
  details?: UpdateClientDetails;
}

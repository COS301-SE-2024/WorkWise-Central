import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';

class ContactInfo {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value.startsWith('0') ? `+27${value.slice(1)}` : value))
  //@IsPhoneNumber(null)
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email?: string;
}
class Address {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  street?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  province?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  suburb?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  @MaxLength(20)
  postalCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  complexOrBuilding?: string;
}
class ClientDetails {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  preferredLanguage?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => ContactInfo)
  contactInfo?: ContactInfo;

  @ApiProperty({ required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => Address)
  address?: Address;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  vatNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  idNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  type?: string;
}

export class UpdateClientDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  registrationNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => ClientDetails)
  details?: ClientDetails;
}

export class UpdateClientRbaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  currentEmployeeId: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateClientDto)
  updateClientDto: UpdateClientDto;
}

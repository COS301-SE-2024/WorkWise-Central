import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Types } from 'mongoose';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { Company } from '../entities/company.entity';

/*export class CreateCompanyDto extends OmitType(Company, [
  'updatedAt',
  'deletedAt',
] as const) {
  creatorId: Types.ObjectId;
}*/

export class contactDetails {
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  public phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  public email: string;
}

class address {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  suburb: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  postalCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  complex: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  houseNumber: string;
}

export class CreateCompanyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsObjectId()
  creatorId: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  registrationNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vatNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  logo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  contactDetails: contactDetails;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  address: address;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  employees: mongoose.Types.ObjectId[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  inventoryItems: mongoose.Types.ObjectId[];

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  private: boolean;
}

export class findCompanyResponseDto {
  data: Company[];
}

export class CreateCompanyResponseDto {
  id: string;

  constructor(message: string) {
    this.id = message;
  }
}

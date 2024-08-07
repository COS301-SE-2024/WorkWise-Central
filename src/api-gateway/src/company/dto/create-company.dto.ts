import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Types } from 'mongoose';
import {
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  //IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Company } from '../entities/company.entity';
import { RegistrationNumber } from '../../utils/Custom Validators/RegistrationNumber';
import { Base64ContentIsImage } from '../../utils/Custom Validators/Base64ContentIsImage';

export class ContactDetails {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (value.startsWith('0') ? `+27${value.slice(1)}` : value))
  //@IsPhoneNumber(null)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
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
}

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  userId: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Validate(RegistrationNumber)
  registrationNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  vatNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Validate(Base64ContentIsImage)
  logo?: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContactDetails)
  contactDetails: ContactDetails;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  private?: boolean = false;
}

export class findCompanyResponseDto {
  data: Company & { _id: Types.ObjectId }[];
}

export class CreateCompanyResponseDto {
  data: Company & { _id: Types.ObjectId };

  constructor(data: Company & { _id: Types.ObjectId }) {
    this.data = data;
  }
}

class FilteredAddress extends OmitType(Address, ['street']) {}

class CompanyAllType {
  registrationNumber: string;
  vatNumber: string;
  name: string;
  logo: string;
  address: FilteredAddress;
}

export class CompanyAllNameResponseDto {
  constructor(data: CompanyAllType[]) {
    this.data = data;
  }
  data: CompanyAllType[];
}

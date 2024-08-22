import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
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
  //MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Company } from '../entities/company.entity';
import { RegistrationNumber, VatNumber } from '../../utils/Custom Validators/RegistrationNumber';

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
  @IsOptional()
  @IsString()
  @Validate(RegistrationNumber)
  registrationNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Validate(VatNumber)
  @MaxLength(10)
  vatNumber?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ description: 'A Base64 URI string' })
  @IsOptional()
  @IsString()
  // @Validate(Base64ContentIsImage)
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

export class CompanyApiCreateObject {
  @ApiProperty()
  ownerId: Types.ObjectId;

  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  registrationNumber?: string;

  @ApiProperty()
  vatNumber?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type?: string;

  @ApiProperty()
  logo?: string = 'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp';

  @ApiProperty()
  contactDetails: ContactDetails;

  @ApiProperty()
  address: Address;

  @ApiProperty()
  private: boolean;

  @ApiHideProperty()
  public createdAt: Date;

  @ApiHideProperty()
  public updatedAt: Date;

  @ApiHideProperty()
  public deletedAt: Date;
}

export class CreateCompanyResponseDto {
  data: CompanyApiCreateObject;

  constructor(data: CompanyApiCreateObject) {
    this.data = data;
  }
}

class FilteredAddress extends OmitType(Address, ['street']) {}

class CompanyAllType {
  _id: Types.ObjectId;
  registrationNumber?: string;
  vatNumber?: string;
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

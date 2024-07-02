import { ApiProperty } from '@nestjs/swagger';
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
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Company } from '../entities/company.entity';

export class ContactDetails {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) =>
    value.startsWith('0') ? `+27${value.slice(1)}` : value,
  )
  //@IsPhoneNumber(null)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
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
}

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vatNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  type?: string;

  @ApiProperty()
  @IsString()
  logo?: string =
    'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp';

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
  @IsString()
  @IsMongoId({ each: true })
  @IsOptional()
  employees?: Types.ObjectId[] = [];

  @ApiProperty()
  @IsOptional()
  @IsMongoId({ each: true })
  inventoryItems?: Types.ObjectId[] = [];

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  private?: boolean = false;
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

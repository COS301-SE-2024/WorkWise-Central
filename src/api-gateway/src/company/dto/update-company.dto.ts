import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RegistrationNumber } from '../../utils/Custom Validators/RegistrationNumber';
import { Types } from 'mongoose';
import { Base64ContentIsImage } from '../../utils/Custom Validators/Base64ContentIsImage';

export class ContactDetails {
  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
}

export class Address {
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
}

export class UpdateCompanyDto {
  @ApiProperty()
  @IsOptional()
  @Validate(RegistrationNumber)
  registrationNumber?: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(10)
  @MaxLength(10)
  vatNumber?: string;

  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  type?: string;

  @ApiProperty({ description: 'Must be converted to Base64' })
  @IsString()
  @IsOptional()
  @Validate(Base64ContentIsImage)
  logo?: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => ContactDetails)
  contactDetails?: ContactDetails;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => Address)
  address?: Address;

  @ApiProperty()
  @IsOptional()
  private?: boolean;
}

export class UpdateCompanyJobStatusesDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;
  @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  jobStatuses: Types.ObjectId[];
}

export class UpdateCompanyJobStatuses {
  constructor(updateCompanyJobStatusesDto: UpdateCompanyJobStatusesDto) {
    this.jobStatuses = updateCompanyJobStatusesDto.jobStatuses;
  }

  jobStatuses: Types.ObjectId[];
}

export class UpdateCompanyLogoDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  logo: Express.Multer.File;
}

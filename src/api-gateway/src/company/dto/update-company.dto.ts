import { Address, ContactDetails } from '../entities/company.entity';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
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

class UpdateContactDetails extends PartialType(ContactDetails) {}
class UpdateAddress extends PartialType(Address) {}

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

  @ApiProperty()
  @IsString()
  @IsOptional()
  logo?: string = 'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp';

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateContactDetails)
  contactDetails?: UpdateContactDetails;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddress)
  address?: UpdateAddress;

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

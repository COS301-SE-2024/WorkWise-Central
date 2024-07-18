import { Address, ContactDetails } from '../entities/company.entity';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { RegistrationNumber } from '../../utils/Custom Validators/RegistrationNumber';

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
  logo?: string =
    'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp';

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

  @ApiProperty({ type: [Types.ObjectId] })
  @IsOptional()
  @IsMongoId({ each: true })
  employees?: Types.ObjectId[];

  @IsOptional()
  @IsMongoId({ each: true })
  inventoryItems?: Types.ObjectId[];

  @ApiProperty()
  @IsOptional()
  private?: boolean;
}

export class UpdateCompanyLogoDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  logo: Express.Multer.File;
}

import { ApiProperty } from '@nestjs/swagger';
import {
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

export class CreateClientDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public surname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  public phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  public address: address;

  @ApiProperty()
  @IsString()
  clientUsername: string;

  @ApiProperty()
  @IsMongoId()
  companyId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  registrationNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  vatNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  preferred_Language: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
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
  @IsString()
  postalCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  complex: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
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
  @IsString()
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

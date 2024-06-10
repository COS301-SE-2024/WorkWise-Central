import { Types } from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class contactInfo {
  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  email: string;
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

class personalInfo {
  @IsString()
  @Prop({ required: true })
  firstName: string;

  @IsString()
  @Prop({ required: true })
  surname: string;

  @IsDate()
  @Prop({ type: Date, required: true })
  dateOfBirth: Date;

  @IsString()
  @Prop({ required: false, default: 'Rather Not Say' })
  gender: string;

  @IsString()
  @Prop({ required: false, default: 'English' })
  preferredLanguage: string;
}

class profile {
  @IsString()
  displayName: string;

  @IsString()
  displayImage?: string;
}

class roles {
  @IsMongoId()
  companyId: Types.ObjectId;
  @IsString()
  role: string;
  @IsArray()
  permissions: string[];
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsObject()
  personalInfo: personalInfo;

  @IsNotEmpty()
  @IsObject()
  address: address;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  joinedCompanies?: string[] | Types.ObjectId[];

  @IsNotEmpty()
  @IsObject()
  contactInfo: contactInfo;

  @IsNotEmpty()
  @IsObject()
  profile: profile;

  @IsOptional()
  @IsArray()
  skills?: string[];

  @IsOptional()
  @IsArray()
  roles?: roles[];

  @IsOptional()
  @IsMongoId()
  public currentCompany: Types.ObjectId;
}

export class createUserResponseDto {
  response: string;

  constructor(message: string) {
    this.response = message;
  }
}

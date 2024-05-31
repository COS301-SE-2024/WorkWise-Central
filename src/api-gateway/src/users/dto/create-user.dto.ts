import {
  User,
  roles,
  systemDetails,
  personalInfo,
  profile,
  address,
  contactInfo,
} from '../entities/user.entity';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
} from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export class CreateUserDto extends OmitType(User, [
  'updated_at',
  'deleted_at',
] as const) {
  @ApiHideProperty()
  @Prop({ required: false })
  uuid: string;

  @ApiProperty()
  systemDetails: systemDetails;

  @ApiProperty()
  personalInfo: personalInfo;

  @ApiPropertyOptional()
  address: address;

  @ApiPropertyOptional()
  joinedCompanies: mongoose.Types.ObjectId[];

  @ApiProperty()
  contactInfo: contactInfo;

  @ApiProperty()
  profile: profile;

  @ApiPropertyOptional()
  skills: string[];

  @ApiPropertyOptional()
  roles: roles;
}

export class createUserResponseDto {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

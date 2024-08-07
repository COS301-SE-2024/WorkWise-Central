import { JoinedCompany, PersonalInfo, Profile, SystemDetails } from '../entities/user.entity';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateJoinedCompanyDto extends PartialType(JoinedCompany) {}
class UpdateSystemDetails extends PartialType(SystemDetails) {}
class UpdatePersonalInfo extends PartialType(PersonalInfo) {}
class UpdateProfile extends PartialType(Profile) {}

export class UpdateUserDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateSystemDetails)
  systemDetails?: UpdateSystemDetails;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePersonalInfo)
  personalInfo?: UpdatePersonalInfo;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateProfile)
  profile?: UpdateProfile;

  /*  @IsOptional()  //Joined Companies will have its own endpoint to enter/exit
  @ValidateNested({ each: true })
  @Type(() => UpdateJoinedCompanyDto)
  joinedCompanies?: UpdateJoinedCompanyDto[];*/

  @IsOptional()
  @IsArray()
  @Type(() => String)
  skills?: string[];

  @IsOptional()
  @IsMongoId()
  currentEmployee?: Types.ObjectId;
}

export class JoinUserDto {
  @ValidateNested({ each: true })
  @Type(() => UpdateJoinedCompanyDto)
  joinedCompanies: UpdateJoinedCompanyDto[];
}

export class UpdateProfilePicDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  profilePicture: Express.Multer.File;
}

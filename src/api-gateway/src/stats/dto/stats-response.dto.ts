import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Address {
  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  province: string;

  @ApiProperty()
  @IsString()
  suburb: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  @IsString()
  complexOrBuilding?: string;
}

export class ContactInfo {
  @ApiProperty()
  @IsString()
  phoneNumber?: string;

  @ApiProperty()
  @IsString()
  email?: string;
}

export class ClientDetails {
  @IsMongoId()
  @ApiProperty()
  clientId: Types.ObjectId;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  preferredLanguage?: string;

  @ApiProperty()
  contactInfo: ContactInfo;

  @ApiProperty()
  address?: Address;
}
export class Ratings {
  @ApiProperty()
  @IsString()
  jobTitle: string;

  @ApiProperty()
  @IsNumber()
  rating: number;
}

export class Client {
  @ApiProperty()
  ClientDetails: ClientDetails;

  @ApiProperty()
  @IsArray()
  jobs: [Types.ObjectId];

  @IsMongoId()
  @ApiProperty()
  @IsNumber()
  numActiveJobs: number;

  @ApiProperty()
  @IsNumber()
  numTotalJobs: number;

  @ApiProperty()
  ratings: [Ratings];

  @ApiProperty()
  @IsNumber()
  averageRating: number;
}

export class ClientResponseDto {
  data: { data: [Client] };
}

export class Employee {
  @ApiProperty()
  @IsString()
  teamName?: string;

  @IsArray()
  @IsMongoId({ each: true })
  @ApiProperty()
  teamMembers?: Types.ObjectId[];

  @IsMongoId()
  @ApiProperty()
  teamLeaderId?: Types.ObjectId;

  @IsArray()
  @IsMongoId({ each: true })
  @ApiProperty()
  currentJobAssignments?: Types.ObjectId[];
}

export class EmployeeResponseDto {
  data: { data: [Employee] };
}

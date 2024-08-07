import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';
import { CreateClientDto } from '../dto/create-client.dto';
import { Company } from '../../company/entities/company.entity';
import { currentDate } from '../../utils/Utils';

export class Address {
  @Prop({ type: String, required: true })
  street: string;
  @Prop({ type: String, required: true })
  suburb: string;
  @Prop({ type: String, required: true })
  province: string;
  @Prop({ type: String, required: true })
  city: string;
  @Prop({ type: String, required: true })
  postalCode: string;
  @Prop({ type: String, required: false })
  complexOrBuilding?: string;
}

export class ContactInfo {
  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: String, unique: true, lowercase: true, trim: true })
  email: string; //TODO: Make unique within company, instead of within DB
}

export class ClientDetails {
  @ApiProperty()
  @Prop({ type: String, required: true })
  firstName: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: false, default: 'English' })
  @ApiProperty()
  preferredLanguage?: string;

  @ApiProperty()
  @Prop({ type: ContactInfo, required: false })
  contactInfo: ContactInfo;

  @ApiProperty()
  @Prop({ type: Address, required: false })
  address?: Address;

  @ApiProperty()
  @Prop({ type: String, required: false })
  vatNumber?: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Company.name })
  companyId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: String, required: false })
  idNumber?: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  type?: string;
}

@Schema()
export class Client {
  constructor(createClientDto: CreateClientDto) {
    if (createClientDto.details) this.details = createClientDto.details;
    if (createClientDto.registrationNumber) this.registrationNumber = createClientDto.registrationNumber;
    this.createdAt = currentDate();
  }

  @ApiProperty()
  @Prop({ type: String, required: false })
  registrationNumber?: string;

  @ApiProperty()
  @Prop({ required: true })
  details: ClientDetails;

  @ApiProperty()
  @Prop({ required: false, default: currentDate() })
  public createdAt: Date;

  @ApiProperty()
  @Prop({ required: false })
  public updatedAt: Date;

  @ApiProperty()
  @Prop({ required: false })
  public deletedAt: Date;
}

export class ClientApiObject {
  @ApiProperty()
  _id?: Types.ObjectId;

  @ApiProperty()
  registrationNumber?: string;

  @ApiProperty()
  details: ClientDetails;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

export class CreateClientResponseDto {
  data: ClientApiObject;

  constructor(data: ClientApiObject) {
    this.data = data;
  }
}

export class ApiResponseDto<Type> {
  data: Type;
  constructor(data: Type) {
    this.data = data;
  }
}

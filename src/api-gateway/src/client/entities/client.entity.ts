import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { CreateClientDto } from '../dto/create-client.dto';

export class Address {
  @Prop({ type: String, required: true })
  street: string;
  @Prop({ type: String, required: true })
  suburb: string;
  @Prop({ type: String, required: true })
  city: string;
  @Prop({ type: String, required: true })
  postalCode: string;
  @Prop({ type: String, required: false })
  complex?: string;
  @Prop({ type: String, required: false })
  houseNumber?: string;
}

export class ContactInfo {
  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: String, unique: true, required: true, lowercase: true })
  email: string;
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

  @ApiHideProperty()
  @Prop({ type: ContactInfo, required: false })
  contactInfo: ContactInfo;

  @ApiHideProperty()
  @Prop({ type: Address, required: false })
  address?: Address;

  @ApiProperty()
  @Prop({ type: String, required: false })
  vatNumber?: string;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, required: false, ref: 'Company' })
  companyId?: Types.ObjectId;

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
    if (createClientDto.clientUsername)
      this.clientUsername = createClientDto.clientUsername;
    if (createClientDto.registrationNumber)
      this.registrationNumber = createClientDto.registrationNumber;
    this.createdAt = new Date();
  }

  @ApiProperty()
  @Prop({ type: String, required: false })
  registrationNumber?: string;

  @ApiProperty()
  @Prop({ type: String, required: false, default: 'none' })
  clientUsername?: string;

  @ApiProperty()
  @Prop({ required: true })
  details: ClientDetails;

  @ApiProperty()
  @Prop({ required: false, default: new Date() })
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
  @Prop({ type: String, required: false })
  _id?: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: String, required: false })
  registrationNumber?: string;

  @ApiProperty()
  @Prop({ type: String, required: false, default: 'none' })
  clientUsername?: string;

  @ApiProperty()
  @Prop({ required: true })
  details: ClientDetails;

  @ApiProperty()
  @Prop({ required: false, default: new Date() })
  public createdAt: Date;

  @ApiProperty()
  @Prop({ required: false })
  public updatedAt: Date;

  @ApiProperty()
  @Prop({ required: false })
  public deletedAt: Date;
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

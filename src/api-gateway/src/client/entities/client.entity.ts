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
  @Prop({ type: String, required: false })
  name?: string;

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
    this.details = createClientDto.details;
    this.clientUsername = createClientDto.clientUsername;
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

export const ClientSchema = SchemaFactory.createForClass(Client);

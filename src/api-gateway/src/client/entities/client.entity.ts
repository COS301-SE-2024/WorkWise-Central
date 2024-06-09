import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { CreateClientDto } from '../dto/create-client.dto';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class address {
  @ApiProperty()
  @Prop({ type: String, required: true })
  street: string;
  @ApiProperty()
  @Prop({ type: String, required: true })
  suburb: string;
  @ApiProperty()
  @Prop({ type: String, required: true })
  city: string;
  @ApiProperty()
  @Prop({ type: String, required: true })
  postalCode: string;
  @ApiProperty()
  @Prop({ type: String, required: true })
  complex: string;
  @ApiProperty()
  @Prop({ type: String, required: true })
  houseNumber: string;
}

export class clientInfo {
  @ApiProperty()
  @Prop({ type: String, required: true })
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty()
  @Prop({ type: address, required: false })
  address: address;
}

export class details {
  @ApiProperty()
  @Prop({ required: true })
  firstName: string;

  @ApiProperty()
  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  @ApiProperty()
  clientInfo: clientInfo;

  @Prop({ required: false })
  @ApiProperty()
  preferred_Language: string;
}

@Schema()
export class Client {
  constructor(createClientDto: CreateClientDto) {
    this.details = new details();
    this.details.firstName = createClientDto.firstName;
    this.details.surname = createClientDto.surname;
    this.registrationNumber = createClientDto.registrationNumber;
    if (createClientDto.clientUsername)
      this.clientUsername = createClientDto.clientUsername;
    this.companyId = new Types.ObjectId(createClientDto.companyId);
    this.name = createClientDto.name;
    this.type = createClientDto.type;
    this.vatNumber = createClientDto.vatNumber;

    if (createClientDto.preferred_Language !== undefined)
      this.details.preferred_Language = createClientDto.preferred_Language;
    this.details.clientInfo = {
      phoneNumber: createClientDto.phoneNumber,
      email: createClientDto.email,
      address: createClientDto.address,
    };
    this.created_at = new Date();
  }
  //Company-specific traits
  @ApiProperty()
  @Prop({ required: false })
  registrationNumber?: string;

  @ApiProperty()
  @Prop({ required: false, default: 'none' })
  clientUsername: string;

  @ApiProperty()
  @Prop({ required: true })
  companyId: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: false })
  name?: string;

  @ApiProperty()
  @Prop({ required: false })
  type?: string;

  @ApiProperty()
  @Prop({ required: false })
  vatNumber?: string;

  @ApiProperty()
  @Prop({ required: true })
  details: details;

  @ApiProperty()
  @Prop({ required: false, default: new Date() })
  public created_at: Date;

  @ApiProperty()
  @Prop({ required: false })
  public updated_at: Date;

  @ApiProperty()
  @Prop({ required: false })
  public deleted_at: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

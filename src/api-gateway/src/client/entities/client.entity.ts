import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { CreateClientDto } from '../dto/create-client.dto';

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
  @Prop({ type: String, required: true, lowercase: true })
  email: string;

  @ApiProperty()
  @Prop({ type: address, required: false })
  address: address;

  @ApiProperty()
  @Prop({ required: false, default: 'English' })
  preferred_Language: string;
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
}

@Schema()
export class Client {
  constructor(createClientDto: CreateClientDto) {
    this.details = new details();
    this.details.firstName = createClientDto.firstName;
    this.details.surname = createClientDto.surname;
    this.details.clientInfo = {
      phoneNumber: createClientDto.phoneNumber,
      email: createClientDto.email,
      address: createClientDto.address,
      preferred_Language: createClientDto.preferred_Language,
    };
    this.created_at = new Date();
  }

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

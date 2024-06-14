import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { CreateCompanyDto } from '../dto/create-company.dto';

@Schema()
export class contactDetails {
  @ApiProperty()
  @Prop({ type: String, required: true })
  phoneNumber: string;

  @ApiProperty()
  @Prop({ type: String, required: true, lowercase: true })
  email: string;
}

export class address {
  @ApiProperty()
  @Prop({ type: String, required: false })
  street: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  suburb: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  city: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  postalCode: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  complex: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  houseNumber: string;
}

@Schema()
export class Company {
  constructor(createCompanyDto: CreateCompanyDto) {
    this.mapFromDto(createCompanyDto);
    this.createdAt = new Date();
  }

  mapFromDto(dto: CreateCompanyDto) {
    for (const key in dto) {
      if (Object.prototype.hasOwnProperty.call(dto, key)) {
        this[key] = dto[key];
      }
    }
  }

  @ApiProperty()
  @Prop({ required: true, unique: true })
  registrationNumber: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  vatNumber: string;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: false })
  type: string;

  @ApiProperty()
  @Prop({
    required: false,
    default:
      'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp',
  })
  logo: string;

  @ApiProperty()
  @Prop({ required: true })
  contactDetails: contactDetails;

  @ApiProperty()
  @Prop({ required: true })
  address: address;

  @ApiProperty()
  @Prop({ type: [mongoose.Types.ObjectId], required: true, default: [] })
  employees: mongoose.Types.ObjectId[];

  @ApiHideProperty()
  @Prop({ type: [mongoose.Types.ObjectId], required: true, default: [] })
  inventoryItems: mongoose.Types.ObjectId[];

  @ApiProperty()
  @Prop({ required: false, default: false })
  private: boolean;

  @ApiHideProperty()
  @Prop({ required: false, default: new Date() })
  public createdAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public updateAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public deletedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

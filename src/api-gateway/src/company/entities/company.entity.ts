import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import mongoose, { Types } from 'mongoose';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { Employee } from '../../employee/entities/employee.entity';

export class ContactDetails {
  @Prop({ type: String, required: true, trim: true })
  phoneNumber: string;

  @Prop({ type: String, unique: true, required: true, lowercase: true })
  email: string;
}

export class Address {
  @Prop({ type: String, required: true })
  street: string;
  @Prop({ type: String, required: true })
  suburb: string;
  @Prop({ type: String, required: true })
  city: string;
  @Prop({ type: String, required: true })
  postalCode: string;
}

@Schema()
export class Company {
  constructor(createCompanyDto: CreateCompanyDto) {
    if (createCompanyDto.name) this.name = createCompanyDto.name;

    if (createCompanyDto.registrationNumber)
      this.registrationNumber = createCompanyDto.registrationNumber;

    if (createCompanyDto.vatNumber) this.vatNumber = createCompanyDto.vatNumber;
    if (createCompanyDto.type) this.type = createCompanyDto.type;
    if (createCompanyDto.logo) this.logo = createCompanyDto.logo;

    if (createCompanyDto.contactDetails)
      this.contactDetails = createCompanyDto.contactDetails;

    if (createCompanyDto.address) this.address = createCompanyDto.address;
    if (createCompanyDto.employees) this.employees = createCompanyDto.employees;

    if (createCompanyDto.inventoryItems)
      this.inventoryItems = createCompanyDto.inventoryItems;

    this.createdAt = new Date();
  }

  /*  mapFromDto(dto: CreateCompanyDto) {
    for (const key in dto) {
      if (Object.prototype.hasOwnProperty.call(dto, key)) {
        this[key] = dto[key];
      }
    }
  }*/

  @ApiProperty()
  @Prop({ required: true, unique: true })
  registrationNumber: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  vatNumber: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  name: string;

  @ApiProperty()
  @Prop({ required: false })
  type?: string;

  @ApiProperty()
  @Prop({
    required: false,
    default:
      'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp',
  })
  logo?: string =
    'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp';

  @ApiProperty()
  @Prop({ required: true })
  contactDetails: ContactDetails;

  @ApiProperty()
  @Prop({ required: true })
  address: Address;

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
  public updatedAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public deletedAt: Date;
}

export class CompanyApiObject {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  id: Types.ObjectId;

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
  type?: string;

  @ApiProperty()
  @Prop({
    required: false,
    default:
      'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp',
  })
  logo?: string =
    'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp';

  @ApiProperty()
  @Prop({ required: true })
  contactDetails: ContactDetails;

  @ApiProperty()
  @Prop({ required: true })
  address: Address;

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
  public updatedAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public deletedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

export class CompanyEmployeesResponseDto {
  constructor(data: Employee & { _id: Types.ObjectId }[]) {
    this.data = data;
  }

  data: Employee & { _id: Types.ObjectId }[];
}

export class CompanyAllResponseDto {
  constructor(data: CompanyApiObject[]) {
    this.data = data;
  }
  data: CompanyApiObject[];
}

export class CompanyResponseDto {
  constructor(data: CompanyApiObject) {
    this.data = data;
  }
  data: CompanyApiObject;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import mongoose, { SchemaTypes, Types } from 'mongoose';
import { CreateCompanyDto } from '../dto/create-company.dto';
import {
  Employee,
  EmployeeApiObject,
} from '../../employee/entities/employee.entity';

export class ContactDetails {
  @Prop({ type: String, required: true, trim: true })
  phoneNumber: string;

  @Prop({
    type: String,
    unique: true,
    index: true,
    required: true,
    lowercase: true,
  })
  email: string;
}

export class Address {
  @Prop({ type: String, required: true })
  street: string;
  @Prop({ type: String, required: true })
  province: string;
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
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: true,
    default: [],
    ref: Employee.name,
  })
  employees: Types.ObjectId[];

  @ApiHideProperty()
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: true,
    default: [],
    /*    ref: Inventory.name,*/ //TODO: Add ref to Inventory
  })
  inventoryItems: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: Boolean, required: true, default: false })
  private: boolean = false;

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
  id: Types.ObjectId;

  @ApiProperty()
  registrationNumber: string;

  @ApiProperty()
  vatNumber: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type?: string;

  @ApiProperty()
  logo?: string =
    'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp';

  @ApiProperty()
  contactDetails: ContactDetails;

  @ApiProperty()
  address: Address;

  @ApiProperty()
  employees: mongoose.Types.ObjectId[];

  @ApiHideProperty()
  inventoryItems: mongoose.Types.ObjectId[];

  @ApiProperty()
  private: boolean;

  @ApiHideProperty()
  public createdAt: Date;

  @ApiHideProperty()
  public updatedAt: Date;

  @ApiHideProperty()
  public deletedAt: Date;
}

export class CompanyApiDetailedObject {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  registrationNumber: string;

  @ApiProperty()
  vatNumber: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type?: string;

  @ApiProperty()
  logo?: string =
    'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp';

  @ApiProperty()
  contactDetails: ContactDetails;

  @ApiProperty()
  address: Address;

  @ApiProperty()
  employees: EmployeeApiObject[];

  @ApiProperty()
  inventoryItems: mongoose.Types.ObjectId[]; //TODO: Change to Actual Type later-on

  @ApiProperty()
  private: boolean;

  @ApiHideProperty()
  public createdAt: Date;

  @ApiHideProperty()
  public updatedAt: Date;

  @ApiHideProperty()
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

export class CompanyAllDetailedResponseDto {
  constructor(data: CompanyApiDetailedObject[]) {
    this.data = data;
  }
  data: CompanyApiDetailedObject[];
}

export class CompanyResponseDto {
  constructor(data: CompanyApiObject) {
    this.data = data;
  }
  data: CompanyApiObject;
}

export class CompanyDetailedResponseDto {
  constructor(data: CompanyApiDetailedObject) {
    this.data = data;
  }
  data: CompanyApiDetailedObject;
}

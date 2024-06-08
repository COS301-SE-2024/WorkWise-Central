import { OmitType } from '@nestjs/swagger';
import { Company } from '../entities/company.entity';
import { Types } from 'mongoose';

export class CreateCompanyDto extends OmitType(Company, [
  'updated_at',
  'deleted_at',
] as const) {
  creatorId: Types.ObjectId;
}

export class CreateCompanyResponseDto {
  id: string;

  constructor(message: string) {
    this.id = message;
  }
}

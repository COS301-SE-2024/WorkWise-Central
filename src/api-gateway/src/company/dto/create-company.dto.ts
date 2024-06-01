import { OmitType } from '@nestjs/swagger';
import { Company } from '../entities/company.entity';

export class CreateCompanyDto extends OmitType(Company, [
  'updated_at',
  'deleted_at',
] as const) {}

export class createCompanyResponseDto {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

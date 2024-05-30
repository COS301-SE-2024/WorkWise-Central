import { OmitType } from '@nestjs/swagger';
import { Company } from '../entities/company.entity';

export class CreateCompanyDto extends OmitType(Company, [
  'updated_at',
  'deleted_at',
] as const) {
  constructor() {
    super();
  }
}

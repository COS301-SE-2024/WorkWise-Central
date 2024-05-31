import { OmitType } from '@nestjs/mapped-types';
import { Company } from '../entities/company.entity';

export class UpdateCompanyDto extends OmitType(Company, [
  'created_at',
  'deleted_at',
]) {}

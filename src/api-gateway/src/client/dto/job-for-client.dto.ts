import { ClientFeedback, Details } from '../../job/entities/job.entity';
import { Types } from 'mongoose';
import { AccountDetails } from '../../company/entities/company.entity';

export class JobForClientDto {
  _id: Types.ObjectId;
  details: Details;
  clientFeedback?: ClientFeedback;
}

export class CompanyStatusesDto {
  data: string[];
}

export class CompanyAccountDetailsDto {
  data: AccountDetails[];
}

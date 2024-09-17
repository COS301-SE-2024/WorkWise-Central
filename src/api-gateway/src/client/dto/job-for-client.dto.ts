import { ClientFeedback, Details } from '../../job/entities/job.entity';
import { Types } from 'mongoose';

export class JobForClientDto {
  _id: Types.ObjectId;
  details: Details;
  clientFeedback?: ClientFeedback;
}

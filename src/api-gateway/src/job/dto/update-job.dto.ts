import { PartialType } from '@nestjs/swagger';
import {
  AssignedEmployees,
  ClientFeedback,
  Details,
  Job,
  RecordedDetails,
  Task,
  Comment,
} from '../entities/job.entity';

class UpdateAssignedEmployees extends PartialType(AssignedEmployees) {}
class UpdateDetails extends PartialType(Details) {}
class UpdateRecordedDetails extends PartialType(RecordedDetails) {}
class UpdateClientFeedback extends PartialType(ClientFeedback) {}
class UpdateTask extends PartialType(Task) {}
class UpdateComment extends PartialType(Comment) {}

export class UpdateJobDto extends PartialType(Job) {}

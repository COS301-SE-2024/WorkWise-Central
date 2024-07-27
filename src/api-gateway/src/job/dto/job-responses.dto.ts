import { JobPriorityTag, JobTag } from '../entities/job-tag.entity';
import { ApiProperty } from '@nestjs/swagger';

type jobTagWithId = JobTag & { _id: string };

export class TagsAllResponseDto {
  @ApiProperty() //TODO: Find solution to show in swagger
  data: jobTagWithId[];
}

// type jobPriorityTagWithId = JobPriorityTag & { _id: string };
// class test extends JobPriorityTag {
//   _id: string;
// }
export class PriorityTagsAllResponseDto {
  data: JobPriorityTag[];
}

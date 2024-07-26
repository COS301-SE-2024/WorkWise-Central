import { JobPriorityTag, JobTag } from '../entities/job-tag.entity';

export class TagsAllResponseDto {
  data: JobTag & { _id: string }[];
}

export class PriorityTagsAllResponseDto {
  data: JobPriorityTag & { _id: string }[];
}

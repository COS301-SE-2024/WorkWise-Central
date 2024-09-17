import { TimeTracker } from '../entities/time-tracker.entity';

export class TimeTrackerWithId extends TimeTracker {
  _id: string;
}
export class TimeTrackerResponseDto {
  data: TimeTrackerWithId;
}

export class TimeTrackersResponseDto {
  data: TimeTrackerWithId[];
}

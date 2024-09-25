export class TimeSpentDto {
  constructor(timeWorked: number, timePaused: number) {
    this.timeWorked = timeWorked;
    this.timePaused = timePaused;
  }
  timeWorked: number;
  timePaused: number;
}

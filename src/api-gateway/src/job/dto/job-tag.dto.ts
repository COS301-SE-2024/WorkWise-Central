import { UpdatePriorityTagDto, UpdateTagDto } from './edit-tag.dto';

export class UpdateTag {
  constructor(u: UpdateTagDto) {
    if (u.label) {
      this.label = u.label;
    }
    if (u.colour) {
      this.colour = u.colour;
    }
  }

  label?: string;
  colour?: string;
}
export class UpdatePriorityTag {
  constructor(u: UpdatePriorityTagDto) {
    if (u.label) {
      this.label = u.label;
    }
    if (u.colour) {
      this.colour = u.colour;
    }
    if (u.priorityLevel) {
      this.priorityLevel = u.priorityLevel;
    }
  }

  label?: string;
  colour?: string;
  priorityLevel?: number;
}

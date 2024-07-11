import mongoose, { Types } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';

export function validateObjectIds(ids: string[] | Types.ObjectId[]): boolean {
  if (ids.length < 1) {
    return false;
  }
  for (const id of ids) {
    if (!mongoose.Types.ObjectId.isValid(id) || id == null) {
      throw new HttpException(`Invalid ${id} ID`, HttpStatus.BAD_REQUEST);
    }
  }
  return true;
}

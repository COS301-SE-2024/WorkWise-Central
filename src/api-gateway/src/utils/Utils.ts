import mongoose, { Types } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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

export function validateObjectId(id: string | Types.ObjectId, entity: string = ''): boolean {
  let data: string;
  if (entity === '') data = `Invalid ID`;
  else data = `Invalid ${entity} ID`;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new HttpException(data, HttpStatus.BAD_REQUEST);
  }
  console.log('valid ObjectId');
  return true;
}

export function extractUserId(jwtService: JwtService, headers: any): Types.ObjectId {
  const authHeader: string = headers.authorization;
  const decodedJwtAccessToken = jwtService.decode(authHeader.replace(/^Bearer\s+/i, ''));
  if (!Types.ObjectId.isValid(decodedJwtAccessToken.sub)) {
    throw new HttpException('Invalid User', HttpStatus.BAD_REQUEST);
  }
  //This attribute is retrieved in the JWT

  return decodedJwtAccessToken.sub;
}

export function currentDate(): Date {
  const date = new Date();
  date.setHours(date.getHours() + 2);
  return date;
}

export function ciEquals(a: string, b: string) {
  return typeof a === 'string' && typeof b === 'string'
    ? a.localeCompare(b, undefined, { sensitivity: 'base' }) === 0
    : a === b;
}

export function isBase64Uri(value: string | string[]) {
  const dataUriRegex = /^data:image\/(png|jpeg|jpg|webp|bmp|gif|svg\+xml);base64,/i;
  if (Array.isArray(value)) {
    for (const base64String of value) {
      if (!dataUriRegex.test(base64String)) {
        return false;
      }
    }
    return true;
  } else {
    return dataUriRegex.test(value);
  }
}

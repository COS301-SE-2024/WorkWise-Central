import { Types } from 'mongoose';

export class signInResponseDto {
  id: Types.ObjectId;
  access_token: string;
}

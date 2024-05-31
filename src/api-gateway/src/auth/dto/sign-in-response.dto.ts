import { Types } from 'mongoose';

export class SignInResponseDto {
  id: Types.ObjectId;
  access_token: string;
}

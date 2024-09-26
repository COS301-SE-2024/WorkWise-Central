import { IsJWT, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class DeleteChatDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  jwt: string;

  @IsNotEmpty()
  @IsMongoId()
  chatId: Types.ObjectId;
}

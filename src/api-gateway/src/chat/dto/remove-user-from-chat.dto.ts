import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class RemoveUserFromChatDto {
  @IsNotEmpty()
  @IsMongoId()
  userIdToRemove: Types.ObjectId;
  @IsNotEmpty()
  @IsMongoId()
  chatId: Types.ObjectId;
}

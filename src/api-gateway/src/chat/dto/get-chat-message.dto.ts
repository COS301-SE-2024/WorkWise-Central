import { IsMongoId, IsNotEmpty } from 'class-validator';

export class GetChatMessagesDto {
  @IsMongoId()
  @IsNotEmpty()
  messageId: string;
}

export class MarkMessageAsReadDto {
  @IsMongoId()
  @IsNotEmpty()
  messageId: string;
}

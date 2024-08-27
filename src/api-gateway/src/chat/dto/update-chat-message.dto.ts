import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateChatMessageDto {
  @IsMongoId()
  @IsNotEmpty()
  chatMessageId: Types.ObjectId;

  @IsString()
  @IsOptional()
  textContent?: string;

  @IsArray()
  @IsOptional()
  attachments?: string[];
}

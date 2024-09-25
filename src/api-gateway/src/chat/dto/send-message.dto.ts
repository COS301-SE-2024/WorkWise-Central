import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
//TODO: Delete later
export class SendMessageDto {
  @IsNotEmpty()
  @IsMongoId()
  chatId: Types.ObjectId;
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  textContent: string;
  @IsOptional()
  attachments?: string[];
}

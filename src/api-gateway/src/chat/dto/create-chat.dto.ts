import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChatMessageDto {
  @IsMongoId()
  @IsNotEmpty()
  chatId: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  textContent: string;

  @IsArray()
  @IsOptional()
  attachments?: string[];
}

import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  chatName: string;

  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  participants: Types.ObjectId[];

  @IsOptional()
  @IsString()
  chatImage?: string;
}

export class AddUsersToChatDto {
  @IsMongoId()
  @IsNotEmpty()
  chatId: Types.ObjectId;

  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  userIds: Types.ObjectId[];
}

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

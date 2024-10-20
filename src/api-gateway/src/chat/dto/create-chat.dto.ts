import { IsArray, IsJWT, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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
  description?: string = '';

  @IsOptional()
  @IsString()
  chatImage?: string;
}

export class AddChatDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  jwt: string;

  @IsString()
  @IsNotEmpty()
  chatName: string;

  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  participants: Types.ObjectId[];

  @IsOptional()
  @IsString()
  description?: string = '';

  @IsOptional()
  @IsString()
  chatImage?: string;
}

export class AddMeDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  jwt: string;

  @IsMongoId()
  @IsNotEmpty()
  chatId: Types.ObjectId;
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

export class UpdateChatDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  jwt: string;

  @IsMongoId()
  @IsNotEmpty()
  chatId: Types.ObjectId;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsOptional()
  admin?: Types.ObjectId;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  participants?: Types.ObjectId[];
}

export class MarkChatAsReadDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  jwt: string;

  @IsMongoId()
  @IsNotEmpty()
  chatId: Types.ObjectId;
}

export class TypingDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  jwt: string;

  @IsMongoId()
  @IsNotEmpty()
  chatId: Types.ObjectId;
}

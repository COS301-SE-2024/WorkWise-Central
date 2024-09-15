import { IsArray, IsJWT, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AddMessageDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  jwt: string;

  @IsNotEmpty()
  @IsMongoId()
  chatId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  textContent: string;

  @IsOptional()
  @IsArray()
  attachments?: string[] = [];
}

export class UpdateMessageDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  jwt: string;

  @IsNotEmpty()
  @IsMongoId()
  chatId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  messageId: Types.ObjectId;

  @IsOptional()
  @IsString()
  body?: string;

  @IsOptional()
  @IsArray()
  attachments?: string[] = [];
}

export class DeleteMessageDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  jwt: string;

  @IsNotEmpty()
  @IsMongoId()
  chatId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  messageId: Types.ObjectId;
}

export class GetUserIdDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  jwt: string;
}

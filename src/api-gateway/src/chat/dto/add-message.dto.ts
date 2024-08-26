import { IsNotEmpty, IsString } from 'class-validator';

export class AddMessageDto {
  author: string;
  @IsNotEmpty()
  @IsString()
  body: string;
  attachments?: string[];
}

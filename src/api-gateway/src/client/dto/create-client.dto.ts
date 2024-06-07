import { address } from '../entities/client.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';

export class CreateClientDto {
  @ApiProperty()
  public firstName: string;

  @ApiProperty()
  public surname: string;

  @ApiProperty()
  public phoneNumber: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public address: address;

  @ApiProperty()
  @Prop({ required: false, default: 'English' })
  preferred_Language: string;
}

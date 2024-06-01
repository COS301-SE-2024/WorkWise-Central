import { address } from '../entities/client.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
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
}

import { address } from '../entities/client.entity';
import { ApiProperty } from '@nestjs/swagger';

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

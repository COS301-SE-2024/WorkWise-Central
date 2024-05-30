import { User } from '../entities/user.entity';
import { OmitType } from '@nestjs/swagger';
//import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto extends OmitType(User, [
  'updated_at',
  'deleted_at',
] as const) {
  /*  @ApiProperty()
  displayName: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiPropertyOptional({ type: [String] })
  roles: string[];

  @ApiPropertyOptional({ default: 'English' })
  preferred_Language: string;

  @ApiPropertyOptional({
    default:
      'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp',
  })
  profilePicture: string;*/

  constructor() {
    super();
    this.user_UUID = ''; //The value will be instantiated before being saved to the DB
  }
}

export class createUserResponseDto {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

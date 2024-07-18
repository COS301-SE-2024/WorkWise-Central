import { UserApiDetailedObject } from '../entities/user.entity';

export class UserAllResponseDetailedDto {
  constructor(data: UserApiDetailedObject[]) {
    this.data = data;
  }
  data: UserApiDetailedObject[];
}

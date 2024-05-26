import { User } from '../../src/users/entities/user.entity';

const date = new Date();

export const userStub = (): User => {
  const result = {
    user_UUID: '123e4567-e89b-12d3-a456-426614174000',
    name: 'John',
    surname: 'Doe',
    password: 'verySecurePassword',
    dateOfBirth: date,
    email: 'john.doe@example.com',
    roles: ['admin', 'user'],
  };

  return result as User;
};

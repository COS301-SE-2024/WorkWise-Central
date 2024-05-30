import { User } from '../../src/users/entities/user.entity';

const date = new Date();

export const userStub = (): User => {
  const result = {
    name: 'John',
    surname: 'Doe',
    password: 'verySecurePassword',
    dateOfBirth: date,
    email: 'john.doe@example.com',
    roles: ['admin', 'user'],
  };

  return result as User;
};

export const getMockDate = () => {
  return date;
};

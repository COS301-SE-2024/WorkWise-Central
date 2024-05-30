const date = new Date();

export const mockUserObject = {
  user_UUID: '123e4567-e89b-12d3-a456-426614174030',
  systemDetails: {
    email: 'user@example.com',
    password: 'password',
    username: 'Default',
  },
  personalInfo: {
    firstName: 'John',
    surname: 'Doe',
    dateOfBirth: date,
    gender: 'Rather Not Say',
    preferred_Language: 'English',
    contactInfo: {
      phoneNumber: '123-456-7890',
      email: 'user@example.com',
    },
    address: {
      street: '123 Main St',
      suburb: 'Suburbia',
      city: 'Metropolis',
      postalCode: '12345',
      complex: 'Apartment Complex',
      houseNumber: 'Apt 42',
    },
  },
  profile: {
    displayName: 'John Doe2',
    displayImage:
      'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp',
  },
  roles: {
    role: 'user',
    permissions: ['read', 'write'],
  },
  created_at: date,
};

export const userStub = () => {
  return mockUserObject;
};

export const getMockDate = () => {
  return date;
};

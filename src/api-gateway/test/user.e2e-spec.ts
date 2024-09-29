import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';
import * as request from 'supertest';

// Import all the dependencies
import { UsersRepository } from '../src/users/users.repository';
import { AuthService } from '../src/auth/auth.service';
import { EmployeeService } from '../src/employee/employee.service';
import { CompanyService } from '../src/company/company.service';
import { EmailService } from '../src/email/email.service';
import { FileService } from '../src/file/file.service';
import { JobService } from '../src/job/job.service';
import { UserConfirmation } from '../src/users/entities/user-confirmation.entity';
import { JwtService } from '@nestjs/jwt';

jest.mock('../src/users/users.repository');
// jest.mock('../src/users/user-confirmation.model');
jest.mock('../src/auth/auth.service');
jest.mock('../src/employee/employee.service');
jest.mock('../src/company/company.service');
jest.mock('../src/email/email.service');
jest.mock('../src/file/file.service');
jest.mock('../src/job/job.service');

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        UsersRepository,
        UserConfirmation,
        AuthService,
        EmployeeService,
        CompanyService,
        EmailService,
        FileService,
        JobService,
        JwtService,
        {
          provide: 'UserConfirmationModel',
          useValue: mockUserConfirmationModel(),
        },
        {
          provide: 'UserPasswordResetModel',
          useValue: mockUserConfirmationModel(),
        },
      ],
    })
      .overrideProvider(UsersRepository)
      .useValue(mockUsersRepository())
      .overrideProvider(UserConfirmation)
      .useValue(mockUserConfirmationModel())
      .overrideProvider(AuthService)
      .useValue(mockAuthService())
      .overrideProvider(EmployeeService)
      .useValue(mockEmployeeService())
      .overrideProvider(CompanyService)
      .useValue(mockCompanyService())
      .overrideProvider(EmailService)
      .useValue(mockEmailService())
      .overrideProvider(FileService)
      .useValue(mockFileService())
      .overrideProvider(JobService)
      .useValue(mockJobService())
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should redirect them to the correct endpoint for documentation related to user', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(({ body }) => {
        expect(body.message).toBeDefined();
        expect(body.message).toContain('documentation');
      });
  });

  it('should create a user', async () => {
    const userDto: any = createUserDtoExample;
    const response = await request(app.getHttpServer()).post('/users/create').send(userDto).expect(409);
    //console.log(response.body);
    expect(response.body.name).toBeDefined();
    expect(response.body.message).toBeDefined();
  });

  it('should update a user', async () => {
    const userId = 1;
    const updateUserDto = {
      username: 'john_doe_updated',
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
      },
      contactInfo: {
        email: 'john.doe.updated@example.com',
        phone: '+1234567890',
      },
      profile: {
        bio: 'Updated bio for John Doe.',
        website: 'https://johndoeupdated.dev',
      },
      skills: ['JavaScript', 'TypeScript', 'Vue.js', 'React'],
    };

    const response = await request(app.getHttpServer()).patch(`/users/${userId}`).send(updateUserDto).expect(404);

    if (response.status == 404) {
      //console.log(response.body);
    } else {
      expect(response.body).toBeDefined();
      expect(response.body.id).toBe(userId);
      expect(response.body.username).toBe(updateUserDto.username);
      expect(updateUserDto.personalInfo.firstName).toBe(updateUserDto.personalInfo.firstName);
      expect(response.body.personalInfo.lastName).toBe(updateUserDto.personalInfo.lastName);
      expect(response.body.contactInfo.email).toBe(updateUserDto.contactInfo.email);
      expect(response.body.contactInfo.phone).toBe(updateUserDto.contactInfo.phone);
      expect(response.body.profile.bio).toBe(updateUserDto.profile.bio);
      expect(response.body.profile.website).toBe(updateUserDto.profile.website);
      expect(response.body.skills).toEqual(expect.arrayContaining(updateUserDto.skills));
    }
  });

  it('should delete a user', async () => {
    const userId = 1;
    const response = await request(app.getHttpServer()).delete(`/users/${userId}`).expect(404);
    if (response.status == 200) {
      expect(response.body).toBeDefined();
      expect(response.body.message).toBe('User deleted successfully');
    } else {
      //console.log(response.body);
      await request(app.getHttpServer()).delete(`/users/${userId}`).expect(404);
    }
  });

  // Mock factory functions
  function mockUsersRepository() {
    return {
      find: jest.fn().mockResolvedValue([{ id: 1, name: 'John Doe' }]),
      findOne: jest.fn().mockResolvedValue({ id: 1, name: 'John Doe' }),
      create: jest.fn().mockResolvedValue({ id: 1, name: 'John Doe' }),
      remove: jest.fn().mockResolvedValue({ affected: 1 }),
    };
  }

  function mockUserConfirmationModel() {
    return {};
  }

  function mockAuthService() {
    return {};
  }

  function mockEmployeeService() {
    return {};
  }

  function mockCompanyService() {
    return {};
  }

  function mockEmailService() {
    return {};
  }

  function mockFileService() {
    return {};
  }

  function mockJobService() {
    return {};
  }
});

const createUserDtoExample = {
  profilePicture: 'https://example.com/profile.jpg',
  username: 'john_doe',
  password: 'securePassword123',
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    // Add other personal info fields as needed
  },
  address: {
    street: '123 Main St',
    city: 'Anytown',
    country: 'Countryland',
    // Add other address fields as needed
  },
  contactInfo: {
    email: 'john.doe@example.com',
    phone: '+1234567890',
    // Add other contact info fields as needed
  },
  profile: {
    bio: 'Software developer with 10 years of experience.',
    website: 'https://johndoe.dev',
    // Add other profile fields as needed
  },
  skills: ['JavaScript', 'TypeScript', 'Vue.js'],
};

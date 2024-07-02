import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { getModelToken } from '@nestjs/mongoose';
import { UsersRepository } from '../users.repository';

const moduleMocker = new ModuleMocker(global);

class userConfirmationModel {
  constructor(private data: any) {}
  create = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn().mockResolvedValue(['event']);
  static findOne = jest.fn().mockResolvedValue('event');
  static findOneAndUpdate = jest.fn().mockResolvedValue('event');
  static deleteOne = jest.fn().mockResolvedValue(true);
}

describe('UsersService', () => {
  let usersService: UsersService;
  beforeEach(async () => {
    function mockUserModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    class MockUserRepository {
      verifyUser(a?: any) {
        return !!a;
      }
      exists(a?: any) {
        return a != 'b';
      }
      softDelete(a: any) {
        console.log(a);
      }
      getUserByUsername() {
        return null;
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
        {
          provide: getModelToken('UserConfirmation'),
          useValue: userConfirmationModel,
        },
        { provide: UsersRepository, useClass: MockUserRepository },
      ],
    })
      .useMocker((token) => {
        const results = ['test1', 'test2'];
        if (token === UsersService) {
          return { findAll: jest.fn().mockResolvedValue(results) };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should be able to create a user', async function () {
    const a = new CreateUserDto();
    a.contactInfo = {
      phoneNumber: '+27123456789',
      email: 'user@example.com',
    };

    a.address = {
      street: '123 Main St',
      suburb: 'Suburbville',
      city: 'Citytown',
      postalCode: '12345',
      complex: 'Apartment Complex',
      houseNumber: 'Unit 5',
    };

    a.personalInfo = {
      firstName: 'John',
      surname: 'Doe',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'Male',
      preferredLanguage: 'English',
    };

    a.profile = {
      displayName: 'John Doe',
      displayImage: 'https://example.com/profile-image.jpg',
    };

    a.skills = ['JavaScript', 'TypeScript', 'NestJS', 'Vue.js'];

    //expect(usersService.create(a)).toBeDefined();
    expect(await usersService.userIsValid(a)).toBe(undefined);
  });

  it('should be able to verify and email', async function () {
    const b = await usersService.verifyUser('test@gmail.com');
    expect(b).toBe(true);
  });

  it('should be able to remove a user', async function () {
    const aa = await usersService.usernameExists('a');
    expect(aa).toBe(true);

    const b = await usersService.usernameExists('b');
    expect(b).toBe(false);
  });

  it('should be able to remove a user', async function () {
    const b = usersService.isValidPhoneNumber('+27689948585');
    expect(b).toBe(true);
  });
});

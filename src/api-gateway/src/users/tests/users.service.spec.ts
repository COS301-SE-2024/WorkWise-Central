import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { getModelToken } from '@nestjs/mongoose';
import { UsersRepository } from '../users.repository';
import { userStub } from '../../../test/stubs/user.stub';
import { JoinedCompany } from '../entities/user.entity';
import { Types } from 'mongoose';
/*jest.mock('../users.service');
jest.mock('../../auth/auth.service');
jest.mock('../../company/company.service');
jest.mock('../../employee/employee.service');
jest.mock('../../email/email.service');
jest.mock('../../job/job.service');
jest.mock('../users.service');*/

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
  let usersRepository: UsersRepository;
  beforeEach(async () => {
    class MockUserRepository {
      verifyUser(a?: string) {
        return a.includes('@');
      }

      softDelete(a: any = 'softDelete') {
        console.log(a);
        return true;
      }
      getUserByUsername() {
        return null;
      }

      findAll() {
        return [userStub(), userStub()];
      }

      findAllInCompany() {
        return [userStub(), userStub()];
      }

      exists(mockId: Types.ObjectId) {
        return mockId !== new Types.ObjectId();
      }

      emailExists(a: string) {
        const email = userStub().systemDetails.email;
        return email === a;
      }

      phoneExists(a: string) {
        const email = userStub().systemDetails.email;
        return email === a;
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('UserConfirmation'),
          useValue: userConfirmationModel,
        },
        { provide: UsersRepository, useClass: MockUserRepository },
      ],
    })
      .useMocker((token) => {
        //const results = ['test1', 'test2'];
        if (token === UsersService) {
          return {
            //findAll: jest.fn().mockResolvedValue(results),
            usernameExists: jest.fn().mockReturnValue(true),
          };
        }

        /*        if (token === AuthService) {
          return {
            findAll: jest.fn().mockResolvedValue(results),
            usernameExists: jest.fn().mockReturnValue(true),
          };
        }

        if (token === EmployeeService) {
          return {
            findAll: jest.fn().mockResolvedValue(results),
            usernameExists: jest.fn().mockReturnValue(true),
          };
        }

        if (token === CompanyService) {
          return {
            findAll: jest.fn().mockResolvedValue(results),
            usernameExists: jest.fn().mockReturnValue(true),
          };
        }*/

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
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
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
      province: 'Gauteng',
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
    const userValid = await usersService.createUserValid(a);
    expect(userValid.isValid).toBe(false);
    expect(userValid.message.length).toBeGreaterThan(0);
  });

  it('should be able to verify and email', async function () {
    const test1 = usersRepository.verifyUser('a@g.com');
    const a = await usersService.verifyUser('testgmail.com');
    const b = await usersService.verifyUser('test@gmail.com');
    expect(test1).toBe(true);
    expect(a).toBe(false);
    expect(b).toBe(true);
  });

  it("should validate user's phone number ", async function () {
    const phoneNum = '+27 84 510 5175';
    const valid = usersService.isValidPhoneNumber(phoneNum);
    expect(valid).toBe(true);
  });

  it('To get user', async function () {
    //const user = userStub();
    const allUsers = await usersRepository.findAll();
    console.log(allUsers);
    expect(allUsers.length).toBeGreaterThan(0);
  });

  it("should change the user's joinedCompanies", async function () {
    const jC = new JoinedCompany(
      new Types.ObjectId(),
      new Types.ObjectId(),
      'Test Company',
    );
    const updatedJC = jC;
    updatedJC.companyName = 'Updated Company';
    expect(updatedJC.companyId).toEqual(jC.companyId);
    expect(updatedJC.companyName).toBe('Updated Company');
  });

  it('should be able to remove a user', async function () {
    const a = await usersService.usernameExists('a');
    expect(a).toBe(true);

    const b = await usersService.usernameExists('b');
    expect(b).toBe(true);
  });
});

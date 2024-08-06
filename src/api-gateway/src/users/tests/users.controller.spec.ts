import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { Types } from 'mongoose';
import { UserApiObject } from '../entities/user.entity';
import { CreateUserDto, CreateUserResponseDto } from '../dto/create-user.dto';
import { HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { UpdateUserDto } from '../dto/update-user.dto';

const moduleMocker = new ModuleMocker(global);

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  class userConfirmationModel {
    constructor(private data: any) {}
    create = jest.fn().mockResolvedValue(this.data);
    static find = jest.fn().mockResolvedValue(['event']);
    static findOne = jest.fn().mockResolvedValue('event');
    static findOneAndUpdate = jest.fn().mockResolvedValue('event');
    static deleteOne = jest.fn().mockResolvedValue(true);
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken('UserConfirmation'),
          useValue: userConfirmationModel,
        },
      ],
    })
      .useMocker((token) => {
        /*        if (token === UsersService) {
          return {
            create: jest.fn().mockReturnValue(userStub()),
            getAllUsers: jest.fn().mockReturnValue([userStub(), userStub()]),
            findUser: jest.fn().mockReturnValue(userStub()),
            update: jest.fn().mockReturnValue(userStub()),
            softDelete: jest.fn().mockReturnValue([]),
          };
        }*/
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should not create a user when null is input', async function () {});

  it('should find all users', async function () {
    const allUsers = await usersController.findAll('');
    console.log(allUsers);
  });

  it('should remove users', function () {
    //expect(usersController.remove(new Types.ObjectId())).toStrictEqual([]);
  });

  it('should reject invalid ObjectIds before processing any request with an ID', async function () {
    expect(() => usersController.validateObjectId('failure')).toThrowError('Invalid ID');
  });

  it('should accept valid ObjectIds before processing any request with an ID', async function () {
    expect(usersController.validateObjectId(new Types.ObjectId())).toBe(true);
  });

  it('should Point you to the docs', function () {
    expect(usersController.lookAtDocumentation()).toStrictEqual({
      message: 'Refer to /documentation for details on the API',
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'Test Username',
        address: undefined,
        contactInfo: undefined,
        password: '',
        personalInfo: undefined,
        profile: undefined,
        skills: [],
      };

      const expectedResponse: CreateUserResponseDto = {
        data: {
          access_token: 'welcome Type code',
          id: new Types.ObjectId(),
          user: new UserApiObject(),
        },
      };

      jest.spyOn(usersService, 'create').mockResolvedValue(expectedResponse);

      const result = await usersController.create(createUserDto);
      expect(result).toEqual(expectedResponse);
    });
    it('should handle exceptions and return a conflict status', async () => {
      const createUserDto: CreateUserDto = {
        address: undefined,
        password: '',
        personalInfo: undefined,
        profile: undefined,
        skills: [],
        username: '',
        contactInfo: { email: 'a.gmail.com', phoneNumber: '+27 67 234 6534' },
      };

      const expectedError = new HttpException('Invalid user data', HttpStatus.CONFLICT);
      jest.spyOn(usersService, 'create').mockRejectedValue(expectedError);

      try {
        await usersController.create(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Invalid user data');
        expect(error.getStatus()).toBe(HttpStatus.CONFLICT);
      }
    });
  });

  describe('usernameExists', () => {
    it('should return true if username exists', async () => {
      const username = 'existingUsername';
      jest.spyOn(usersService, 'usernameExists').mockResolvedValue(true);

      const result = await usersController.usernameExists(username);
      expect(result).toEqual({ data: true });
    });

    it('should return false if username does not exist', async () => {
      const username = 'nonExistingUsername';
      jest.spyOn(usersService, 'usernameExists').mockResolvedValue(false);

      const result = await usersController.usernameExists(username);
      expect(result).toEqual({ data: false });
    });

    it('should handle exceptions and return an internal server error', async () => {
      const username = 'errorUsername';
      jest
        .spyOn(usersService, 'usernameExists')
        .mockRejectedValue(new InternalServerErrorException('Something went wrong'));

      try {
        await usersController.usernameExists(username);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('emailExists', () => {
    it('should return true if email exists', async () => {
      const userEmail = 'existingEmail@gmail.com';
      jest.spyOn(usersService, 'emailExists').mockResolvedValue(true);

      const result = await usersController.emailExists({ email: userEmail });
      expect(result).toEqual({ data: true });
    });

    it('should return false if email does not exist', async () => {
      const userEmail = 'nonExistingEmail@gmail.com';
      jest.spyOn(usersService, 'emailExists').mockResolvedValue(false);

      const result = await usersController.emailExists({ email: userEmail });
      expect(result).toEqual({ data: false });
    });

    it('should handle exceptions and return an internal server error', async () => {
      const username = 'errorUsername';
      jest
        .spyOn(usersService, 'usernameExists')
        .mockRejectedValue(new InternalServerErrorException('Something went wrong'));

      try {
        await usersController.usernameExists(username);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('phoneExists', () => {
    it('should return true if phone exists', async () => {
      const userPhone = '+27 323 5454';
      jest.spyOn(usersService, 'phoneExists').mockResolvedValue(true);

      const result = await usersController.phoneExists(userPhone);
      expect(result).toEqual({ data: true });
    });

    it('should return false if phone does not exist', async () => {
      const userPhone = '+2700 323 5456';
      jest.spyOn(usersService, 'phoneExists').mockResolvedValue(false);

      const result = await usersController.phoneExists(userPhone);
      expect(result).toEqual({ data: false });
    });

    it('should handle exceptions and return an internal server error', async () => {
      const username = 'errorUsername';
      jest
        .spyOn(usersService, 'phoneExists')
        .mockRejectedValue(new InternalServerErrorException('Something went wrong'));

      try {
        await usersController.usernameExists(username);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('update', () => {
    it('should update user attributes', async () => {
      /*      const userId = 'validUserId';
      const updateUserDto: UpdateUserDto = {
        systemDetails: {
          username: 'Test user',
        },
      };*/
      /*      const expectedResponse:
        | (FlattenMaps<User> & { _id: Types.ObjectId })
        | Promise<FlattenMaps<User> & { _id: Types.ObjectId }> = {
        systemDetails: {
          username: 'Test',
          password: 'pass',
        },
      };

      /*      jest
        .spyOn(usersService, 'updateUser')
        .mockResolvedValue({ _id: new Types.ObjectId() });

      const result = await userController.update({ userId }, updateUserDto);
      expect(result).toEqual(expectedResponse);*/
    });

    it('should handle exceptions and return an internal server error', async () => {
      const userId = 'invalidUserId';
      const updateUserDto: UpdateUserDto = { skills: ['NewSkill'] };

      jest.spyOn(usersService, 'updateUser').mockRejectedValue(new Error('DB error'));

      try {
        await usersController.update({ userId }, updateUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('internal server error');
      }
    });
  });

  describe('remove', () => {
    it('should delete a user if ID is valid', async () => {
      const userId = new Types.ObjectId();

      jest.spyOn(usersController, 'validateObjectId').mockImplementation((a: Types.ObjectId) => {
        console.log(a);
        return true;
      });

      jest.spyOn(usersService, 'softDelete').mockResolvedValue(true);

      const result = await usersService.softDelete(userId);
      expect(result).toEqual(true);
    });

    it('should handle invalid ID and return a bad request error', async () => {
      const userId = new Types.ObjectId();
      const invalidIdParam = 'invalidIdParam';

      jest.spyOn(usersController, 'validateObjectId').mockImplementation((a: Types.ObjectId) => {
        console.log(a);
        return true;
      });

      try {
        await usersController.remove({ userId }, invalidIdParam);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Invalid ID');
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });

    it('should handle exceptions and return an internal server error', async () => {
      const userId = new Types.ObjectId();
      const idParam = new Types.ObjectId().toString();

      jest.spyOn(usersController, 'validateObjectId').mockImplementation((a: Types.ObjectId) => {
        console.log(a);
        return true;
      });

      jest.spyOn(usersService, 'softDelete').mockRejectedValue(new Error('DB error'));

      try {
        await usersController.remove({ userId }, idParam);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Internal Server Error');
        expect(error.getStatus()).toBe(HttpStatus.SERVICE_UNAVAILABLE);
      }
    });
  });
});

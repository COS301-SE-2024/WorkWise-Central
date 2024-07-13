import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from '../company.controller';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { CompanyService } from '../company.service';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { UsersService } from '../../users/users.service';
import { UsersController } from '../../users/users.controller';
import {
  CreateCompanyDto,
  CreateCompanyResponseDto,
} from '../dto/create-company.dto';

const moduleMocker = new ModuleMocker(global);

describe('CompanyController', () => {
  let companyController: CompanyController;
  let companyService: CompanyService;
  let usersService: UsersService;
  class companyModel {
    constructor(private data: any) {}
    create = jest.fn().mockResolvedValue(this.data);
    static find = jest.fn().mockResolvedValue(['event']);
    static findOne = jest.fn().mockResolvedValue('event');
    static findOneAndUpdate = jest.fn().mockResolvedValue('event');
    static deleteOne = jest.fn().mockResolvedValue(true);
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController, UsersController],
      providers: [
        CompanyService,
        {
          provide: getModelToken('Company'),
          useValue: companyModel,
        },
      ],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    companyController = module.get<CompanyController>(CompanyController);
    companyService = module.get<CompanyService>(CompanyService);
    //Other
    usersService = module.get<UsersService>(UsersService);
    //usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(companyController).toBeDefined();
  });

  it('should reject invalid ObjectIds before processing any request with an ID', async function () {
    expect(() => companyController.validateObjectId('failure')).toThrowError(
      'Invalid ID',
    );
  });

  it('should accept valid ObjectIds before processing any request with an ID', async function () {
    expect(companyController.validateObjectId(new Types.ObjectId())).toBe(true);
  });

  it('should Point you to the docs', function () {
    expect(companyController.lookAtDocumentation()).toStrictEqual({
      message: 'Refer to /documentation for details on the API',
    });
  });

  describe('create', () => {
    it('should create a new company', async () => {
      const createCompanyDto: CreateCompanyDto = {
        name: 'Test Company',
        address: undefined,
        contactDetails: undefined,
        registrationNumber: '',
        userId: undefined,
        vatNumber: '',
      };

      const expectedResponse: CreateCompanyResponseDto = {
        data: undefined,
      };

      jest.spyOn(companyService, 'create').mockResolvedValue(expectedResponse);

      const result = await companyController.create(createCompanyDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should handle exceptions and return a conflict status', async () => {
      const createCompanyDto: CreateCompanyDto = {
        name: 'Test Company',
        address: undefined,
        contactDetails: undefined,
        registrationNumber: '',
        userId: undefined,
        vatNumber: '',
      };

      const expectedError = new HttpException(
        'Invalid company data',
        HttpStatus.CONFLICT,
      );
      jest.spyOn(companyService, 'create').mockRejectedValue(expectedError);

      try {
        await companyController.create(createCompanyDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Invalid company data');
        expect(error.getStatus()).toBe(HttpStatus.CONFLICT);
      }
    });
  });

  describe('update', () => {
    it('should update Company attributes', async () => {
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
      const updateCompanyDto: UpdateCompanyDto = { name: 'TestCo' };

      jest
        .spyOn(companyService, 'update')
        .mockRejectedValue(new Error('DB error'));
      try {
        await companyController.update({ userId }, 'compId', updateCompanyDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('remove', () => {
    it('should delete a user if ID is valid', async () => {
      const userId = new Types.ObjectId();

      jest
        .spyOn(companyController, 'validateObjectId')
        .mockImplementation((a: Types.ObjectId) => {
          console.log(a);
          return true;
        });

      jest.spyOn(usersService, 'softDelete').mockResolvedValue(true);

      const result = await usersService.softDelete(userId);
      expect(result).toEqual(true);
    });

    it('should handle invalid ID and return a bad request error', async () => {
      const companyId = new Types.ObjectId();
      const invalidIdParam = 'invalidIdParam';

      jest
        .spyOn(companyController, 'validateObjectId')
        .mockImplementation((a: Types.ObjectId) => {
          console.log(a);
          return true;
        });

      try {
        await companyController.remove(
          { invalidIdParam },
          companyId.toString(),
        );
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(503);
      }
    });

    it('should handle exceptions and return an internal server error', async () => {
      const userId = new Types.ObjectId();
      const idParam = new Types.ObjectId().toString();

      jest
        .spyOn(companyController, 'validateObjectId')
        .mockImplementation((a: Types.ObjectId) => {
          console.log(a);
          return true;
        });

      jest
        .spyOn(usersService, 'softDelete')
        .mockRejectedValue(new Error('DB error'));

      try {
        await companyController.remove({ userId }, idParam);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Internal Server Error');
        expect(error.getStatus()).toBe(HttpStatus.SERVICE_UNAVAILABLE);
      }
    });
  });
});

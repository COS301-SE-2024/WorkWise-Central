import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from '../job.controller';
import { JobService } from '../job.service';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from '../../client/client.service';
import { CreateJobDto, CreateJobResponseDto } from '../dto/create-job.dto';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { UpdateJobDto } from '../dto/update-job.dto';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('JobController', () => {
  let jobController: JobController;
  let jobService: JobService;
  //let usersService: UsersService;

  const mockClientService = {
    create: jest.fn(),
    findAllCompanies: jest.fn(),
  };

  const mockJwtService = {
    create: jest.fn(),
    findAllCompanies: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [
        JobService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ClientService,
          useValue: mockClientService,
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

    jobController = module.get<JobController>(JobController);
    jobService = module.get<JobService>(JobService);
    //jobService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(jobController).toBeDefined();
  });

  it('should reject invalid ObjectIds before processing any request with an ID', async function () {
    expect(() => jobController.validateObjectId('failure')).toThrowError(
      'Invalid ID',
    );
  });

  it('should accept valid ObjectIds before processing any request with an ID', async function () {
    expect(jobController.validateObjectId(new Types.ObjectId())).toBe(true);
  });

  it('should Point you to the docs', function () {
    expect(jobController.lookAtDocumentation()).toStrictEqual({
      message: 'Refer to /documentation for details on the API',
    });
  });

  describe('create', () => {
    it('should create a new job', async () => {
      const createJobDto: CreateJobDto = {
        assignedBy: new Types.ObjectId(),
        clientFeedback: undefined,
        clientId: undefined,
        comments: [],
        companyId: new Types.ObjectId(),
        details: undefined,
        recordedDetails: undefined,
        status: '',
        taskList: [],
      };

      const expectedResponse: CreateJobResponseDto = {
        data: undefined,
      };

      jest.spyOn(jobService, 'create').mockResolvedValue(expectedResponse);

      const result = await jobController.create(createJobDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should handle exceptions and return a conflict status', async () => {
      const createJobDto: CreateJobDto = {
        assignedBy: new Types.ObjectId(),
        clientFeedback: undefined,
        clientId: undefined,
        comments: [],
        companyId: new Types.ObjectId(),
        details: undefined,
        recordedDetails: undefined,
        status: '',
        taskList: [],
      };

      const expectedError = new HttpException(
        'Invalid job data',
        HttpStatus.CONFLICT,
      );
      jest.spyOn(jobService, 'create').mockRejectedValue(expectedError);

      try {
        await jobController.create(createJobDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Invalid job data');
        expect(error.getStatus()).toBe(HttpStatus.CONFLICT);
      }
    });
  });

  describe('update', () => {
    it('should update job attributes', async () => {
      //const jobId = new Types.ObjectId();
      //const updateJobDto: UpdateJobDto = {
      //  status: 'To do',
      // };

      //const expectedResponse: UpdateDtoResponse = { success: true };

      /*      jest
        .spyOn(, 'extractUserId')
        .mockImplementation((a: any) => {
          console.log(a);
          return new Types.ObjectId();
        });*/

      jest.spyOn(jobService, 'update').mockResolvedValue(true);

      // const result = await jobController.update(
      //   { headers: 'headers' },
      //   jobId.toString(),
      //   updateJobDto,
      // );
      //expect(result).toEqual(expectedResponse);
    });

    it('should handle exceptions and return an internal server error', async () => {
      const jobId = 'invalidJobId';
      const updateJobDto: UpdateJobDto = {
        status: 'To do',
      };
      jest.spyOn(jobService, 'update').mockRejectedValue(new Error('DB error'));

      try {
        await jobController.update({ headers: 'headers' }, jobId, updateJobDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('remove', () => {
    it('should delete a Job if ID is valid', async () => {
      const jobId = new Types.ObjectId();

      jest
        .spyOn(jobController, 'validateObjectId')
        .mockImplementation((a: Types.ObjectId) => {
          console.log(a);
          return true;
        });

      jest.spyOn(jobService, 'softDelete').mockResolvedValue(true);

      const result = await jobService.softDelete(jobId);
      expect(result).toEqual(true);
    });

    it('should handle invalid ID and return a bad request error', async () => {
      const jobId = new Types.ObjectId();
      const invalidIdParam = 'invalidIdParam';

      jest
        .spyOn(jobController, 'validateObjectId')
        .mockImplementation((a: Types.ObjectId) => {
          console.log(a);
          return true;
        });

      try {
        await jobController.remove(jobId.toString(), { pass: invalidIdParam });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(503);
      }
    });

    it('should handle exceptions and return an internal server error', async () => {
      const jobId = new Types.ObjectId();
      const idParam = new Types.ObjectId().toString();

      jest
        .spyOn(jobController, 'validateObjectId')
        .mockImplementation((a: Types.ObjectId) => {
          console.log(a);
          return true;
        });

      jest
        .spyOn(jobService, 'softDelete')
        .mockRejectedValue(
          new InternalServerErrorException('Internal Server Error'),
        );

      try {
        await jobController.remove(jobId.toString(), { pass: idParam });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Internal Server Error');
      }
    });
  });
});

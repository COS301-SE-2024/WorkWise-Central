import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';
import { userStub } from '../../test/stubs/user.stub';

describe('JobService', () => {
  let service: JobService;

  const mockJobModel = {
    create: jest.fn().mockReturnValue(userStub()),
    findAll: jest.fn().mockReturnValue(userStub()),
    findUser: jest.fn().mockReturnValue(userStub()),
    update: jest.fn().mockReturnValue(userStub()),
    remove: jest.fn().mockReturnValue(userStub()),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobService],
    }).compile();

    service = module.get<JobService>(JobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

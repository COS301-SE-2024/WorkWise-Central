import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from '../stats.controller';
import { TeamService } from '../stats.service';
// import { Types } from 'mongoose';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

jest.mock('../team.service');
const moduleMocker = new ModuleMocker(global);

describe('--Team Controller--', () => {
  let controller: TeamController;
  // let service: TeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [TeamService],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<TeamController>(TeamController);
    // service = module.get<TeamService>(TeamService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('hello', () => {
    it('should return message', () => {
      expect(controller.hello()).toEqual({
        message: 'Refer to /documentation for details on the API',
      });
    });
  });

  describe('findAll', () => {
    // it('should return an array of teams', async () => {
    //   const returnedResponseFromService = [
    //     {
    //       _id: new Types.ObjectId(),
    //       companyId: new Types.ObjectId(),
    //       teamName: 'Team Name',
    //       teamMembers: [new Types.ObjectId()],
    //       teamLeaderId: new Types.ObjectId(),
    //       currentJobAssignments: [new Types.ObjectId()],
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       deletedAt: null,
    //     },
    //   ];
    //   const expectedResponse = {
    //     data: returnedResponseFromService,
    //   };
    //   jest.spyOn(service, 'findAll').mockResolvedValue(returnedResponseFromService as any);
    //   expect(await controller.findAll()).toEqual(expectedResponse);
    // });
  });

  describe('findById', () => {
    // it('should return a team', async () => {
    //   const id = new Types.ObjectId();
    //   const returnedResponseFromService = {
    //     _id: new Types.ObjectId(),
    //     companyId: new Types.ObjectId(),
    //     teamName: 'Team Name',
    //     teamMembers: [new Types.ObjectId()],
    //     teamLeaderId: new Types.ObjectId(),
    //     currentJobAssignments: [new Types.ObjectId()],
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     deletedAt: null,
    //   };
    //   const expectedResponse = {
    //     data: returnedResponseFromService,
    //   };
    //   jest.spyOn(service, 'findById').mockResolvedValue(returnedResponseFromService as any);
    //   expect(await controller.findById(id)).toEqual(expectedResponse);
    // });
  });

  describe('create', () => {
    // it('should return a new team', async () => {
    //   const createTeamDto = {
    //     companyId: new Types.ObjectId(),
    //     teamName: 'Team Name',
    //     teamMembers: [new Types.ObjectId()],
    //     teamLeaderId: new Types.ObjectId(),
    //   };
    //   const returnedResponseFromService = {
    //     teamName: 'Team Name',
    //     teamMembers: [new Types.ObjectId()],
    //     companyId: new Types.ObjectId(),
    //     teamLeaderId: new Types.ObjectId(),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     deletedAt: null,
    //   };
    //   const expectedResponse = {
    //     data: returnedResponseFromService,
    //   };
    //   jest.spyOn(service, 'create').mockResolvedValue(returnedResponseFromService as any);
    //   expect(await controller.create(createTeamDto)).toEqual(expectedResponse);
    // });
  });

  describe('update', () => {
    // it('should return an updated team', async () => {
    //   const id = new Types.ObjectId();
    //   const updateTeamDto = {
    //     teamName: 'Team Name',
    //     teamMembers: [new Types.ObjectId()],
    //     teamLeaderId: new Types.ObjectId(),
    //     currentJobAssignments: [new Types.ObjectId()],
    //   };
    //   const returnedResponseFromService = {
    //     _id: new Types.ObjectId(),
    //     companyId: new Types.ObjectId(),
    //     teamName: 'Team Name',
    //     teamMembers: [new Types.ObjectId()],
    //     teamLeaderId: new Types.ObjectId(),
    //     currentJobAssignments: [new Types.ObjectId()],
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     deletedAt: null,
    //   };
    //   const expectedResponse = {
    //     data: returnedResponseFromService,
    //   };
    //   jest.spyOn(service, 'update').mockResolvedValue(returnedResponseFromService as any);
    //   expect(await controller.update(id, updateTeamDto)).toEqual(expectedResponse);
    // });
  });

  describe('remove', () => {
    // it('should return true when the team has been deleted', async () => {
    //   const id = new Types.ObjectId();
    //   const returnedResponseFromService = true;
    //   const expectedResponse = {
    //     data: returnedResponseFromService,
    //   };
    //   jest.spyOn(service, 'remove').mockResolvedValue(returnedResponseFromService as any);
    //   expect(await controller.remove(id)).toEqual(expectedResponse);
    // });
    // it('should return false when the team has been deleted', async () => {
    //   const id = new Types.ObjectId();
    //   const returnedResponseFromService = false;
    //   const expectedResponse = {
    //     data: returnedResponseFromService,
    //   };
    //   jest.spyOn(service, 'remove').mockResolvedValue(returnedResponseFromService as any);
    //   expect(await controller.remove(id)).toEqual(expectedResponse);
    // });
  });
});

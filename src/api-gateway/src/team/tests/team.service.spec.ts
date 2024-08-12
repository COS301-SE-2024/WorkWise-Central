import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { TeamService } from '../team.service';
import { TeamRepository } from '../team.repository';
import { CompanyService } from '../../company/company.service';
import { Team } from '../entities/team.entity';
import { EmployeeService } from '../../employee/employee.service';
import { JobService } from '../../job/job.service';

const mockTeamRepository = {
  findAll: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  findByIdInCompany: jest.fn(),
  findByNameInCompany: jest.fn(),
  teamExists: jest.fn(),
  teamExistsInCompany: jest.fn(),
  teamNameExistsInCompany: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const mockEmployeeService = {
  employeeExistsForCompany: jest.fn(),
  employeeExists: jest.fn(),
};

const mockCompanyService = {
  companyIdExists: jest.fn(),
};

const mockJobService = {
  jobExistsInCompany: jest.fn(),
};

describe('--Team Service--', () => {
  let service: TeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        { provide: getModelToken(Team.name), useValue: {} },
        { provide: TeamRepository, useValue: mockTeamRepository },
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: CompanyService, useValue: mockCompanyService },
        { provide: JobService, useValue: mockJobService },
      ],
    }).compile();

    service = module.get<TeamService>(TeamService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    //TODO
  });

  describe('findAll', () => {
    it('should return all teams', async () => {
      const teamLeader = new Types.ObjectId();
      const teams = [
        {
          _id: new Types.ObjectId(),
          companyId: new Types.ObjectId(),
          teamName: 'Team 1',
          teamMembers: [teamLeader, new Types.ObjectId(), new Types.ObjectId()],
          teamLeaderId: teamLeader,
          currentJobAssignments: [new Types.ObjectId(), new Types.ObjectId()],
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
        {
          _id: new Types.ObjectId(),
          companyId: new Types.ObjectId(),
          teamName: 'Team 2',
          teamMembers: [teamLeader, new Types.ObjectId(), new Types.ObjectId()],
          teamLeaderId: teamLeader,
          currentJobAssignments: [new Types.ObjectId(), new Types.ObjectId()],
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
      ];

      mockTeamRepository.findAll.mockResolvedValue(teams);
      const result = await service.findAll();
      expect(result).toEqual(teams);
    });
  });

  describe('findById', () => {
    it('should return a team by id', async () => {
      const teamLeader = new Types.ObjectId();
      const team = {
        _id: new Types.ObjectId(),
        companyId: new Types.ObjectId(),
        teamName: 'Team 1',
        teamMembers: [teamLeader, new Types.ObjectId(), new Types.ObjectId()],
        teamLeaderId: teamLeader,
        currentJobAssignments: [new Types.ObjectId(), new Types.ObjectId()],
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      };

      mockTeamRepository.findById.mockResolvedValue(team);
      const result = await service.findById(team._id);
      expect(result).toEqual(team);
    });
  });

  describe('findByNameInCompany', () => {
    it('should return a team by name in a company', async () => {
      const teamLeader = new Types.ObjectId();
      const team = {
        _id: new Types.ObjectId(),
        companyId: new Types.ObjectId(),
        teamName: 'Team 1',
        teamMembers: [teamLeader, new Types.ObjectId(), new Types.ObjectId()],
        teamLeaderId: teamLeader,
        currentJobAssignments: [new Types.ObjectId(), new Types.ObjectId()],
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      };

      mockCompanyService.companyIdExists.mockResolvedValue(true);
      mockTeamRepository.findByNameInCompany.mockResolvedValue(team);
      const result = await service.findByNameInCompany(team.teamName, team.companyId);
      expect(result).toEqual(team);
    });
  });

  describe('teamExists', () => {
    it('should return true if team exists', async () => {
      mockTeamRepository.teamExists.mockResolvedValue(true);
      const result = await service.teamExists(new Types.ObjectId());
      expect(result).toEqual(true);
    });
    it('should return true if team exists', async () => {
      mockTeamRepository.teamExists.mockResolvedValue(true);
      const result = await service.teamExists(new Types.ObjectId());
      expect(result).toEqual(true);
    });
  });

  describe('teamExistsInCompany', () => {
    it('should return true if team exists for a company', async () => {
      mockCompanyService.companyIdExists.mockResolvedValue(true);
      mockTeamRepository.teamExistsInCompany.mockResolvedValue(true);
      const result = await service.teamExistsInCompany(new Types.ObjectId(), new Types.ObjectId());
      expect(result).toEqual(true);
    });
    it('should return true if team exists for a company', async () => {
      mockCompanyService.companyIdExists.mockResolvedValue(true);
      mockTeamRepository.teamExistsInCompany.mockResolvedValue(true);
      const result = await service.teamExistsInCompany(new Types.ObjectId(), new Types.ObjectId());
      expect(result).toEqual(true);
    });
  });

  describe('update', () => {
    //TODO
  });

  describe('remove', () => {
    it('should return true if role is removed', async () => {
      const id = new Types.ObjectId();
      jest.spyOn(service, 'teamExists').mockResolvedValue(true);
      mockTeamRepository.remove.mockResolvedValue(true);
      const result = await service.remove(id);
      expect(result).toBe(true);
    });
    it('should return false if role is not removed', async () => {
      const id = new Types.ObjectId();
      jest.spyOn(service, 'teamExists').mockResolvedValue(true);
      mockTeamRepository.remove.mockResolvedValue(false);
      const result = await service.remove(id);
      expect(result).toBe(false);
    });
  });
});

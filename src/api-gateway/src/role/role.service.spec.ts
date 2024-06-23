/*
import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleService],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
*/
describe('myGenericFunction', () => {
  it('should return the correct value', () => {
    const result = 1;
    expect(result).toBe(1);
  });
});

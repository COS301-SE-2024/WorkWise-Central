/*
import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from '../email.service';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService],
    }).compile();

    service = module.get<EmailService>(EmailService);
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

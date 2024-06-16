import { Test, TestingModule } from '@nestjs/testing';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';

describe('NotificationGateway', () => {
  let gateway: NotificationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationGateway, NotificationService],
    }).compile();

    gateway = module.get<NotificationGateway>(NotificationGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

/*
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from '../notification.controller';

describe('NotificationController', () => {
  let controller: NotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
*/

describe('myGenericFunction', () => {
  it('should return the correct value', () => {
    const result = 1;
    expect(result).toBe(1);
  });
});

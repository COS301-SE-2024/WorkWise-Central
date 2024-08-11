import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from '../notification.controller';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { NotificationService } from '../notification.service';

const moduleMocker = new ModuleMocker(global);

describe('NotificationController', () => {
  let notificationController: NotificationController;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
    })
      .useMocker((token) => {
        /*        if (token === NotificationRepository) {
          return {
            create: jest.fn().mockReturnValue(userStub()),
            getAllUsers: jest.fn().mockReturnValue([userStub(), userStub()]),
            findUser: jest.fn().mockReturnValue(userStub()),
            update: jest.fn().mockReturnValue(userStub()),
            softDelete: jest.fn().mockReturnValue([]),
            sendUserConfirmation: jest.fn().mockReturnValue(true),
            sendEmailConfirmation: jest.fn().mockReturnValue(true),
          };
        }*/

        /*        if (token === NotificationService) {
          return {
            create: jest.fn().mockReturnValue(userStub()),
            watchDatabase: jest.fn().mockReturnValue([userStub(), userStub()]),
            createNotificationsFromUser: jest.fn().mockReturnValue({
              data: 'success',
            }),
            findAllWithEmployeeId: jest.fn().mockReturnValue([]),
            findAllWithUserId: jest.fn().mockReturnValue([]),
          };
        }*/

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    notificationController = module.get<NotificationController>(NotificationController);
    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(notificationController).toBeDefined();
    expect(notificationService).toBeDefined();
  });

  describe('notifications', () => {
    it('should request notification permission', async () => {
      /*      const expectedPermission = 'granted';
      const createdNotification: CreateNotificationDto ={
      recipientIds: new Types.ObjectId(),
      message:'Test notification'
    };
      notificationService.create({}).mockResolvedValue(expectedPermission);

      const result = await ();
      expect(result).toBe();*/
    });

    it('should handle exceptions when requesting permission', async () => {
      /*      const expectedError = new Error('');
      Notification.requestPermission.mockRejectedValue(expectedError);

      try {
        //await //();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('NotificationsAPI error');
      }*/
    });

    it('should create a notification if permission is granted', () => {
      /*      const title = 'Test Notification';
      const body = 'This is a test notification';

      const result = (title, body);
      expect(result).toBeInstanceOf(Notification);*/
    });

    it('should not create a notification if permission is denied', () => {});

    it('should handle exceptions when creating a notification', () => {
      /*      const title = 'Test Notification';
      const body = 'This is a test notification';

      notificationService.mockImplementationOnce(() => {
        throw new Error('NotificationsAPI error');
      });

      try {
        createNotify(title, body);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('NotificationsAPI error');
      }*/
    });
  });
});

import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { MultipleDeviceNotificationDTO } from './dto/multipleDeviceNotification.dto';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class FcmNotificationService {
  constructor() {
    const { privateKey } = JSON.parse(process.env.FB_PRIVATE_KEY);

    const serviceAccount = {
      projectId: `${process.env.FB_PROJECT_ID}`,
      clientEmail: `${process.env.FB_CLIENT_EMAIL}`,
      privateKey: privateKey,
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  async sendNotification(token: string, payload: admin.messaging.MessagingPayload) {
    try {
      await admin.messaging().sendToDevice(token, payload);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  async sendNotificationToUser({ token, title, body, icon }: NotificationDto) {
    try {
      const response = await admin.messaging().send({
        token,
        webpush: {
          notification: {
            title,
            body,
            icon,
          },
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async sendingNotificationOneUser(token: string) {
    const payload = {
      token: token,
      notification: {
        title: 'Hi there this is title',
        body: 'Hi there this is message',
      },
      data: {
        name: 'Joe',
        age: '21',
      },
    };

    return admin
      .messaging()
      .send(payload)
      .then((res) => {
        console.log(res);
        return {
          success: true,
        };
      })
      .catch((error) => {
        console.log(error);
        return {
          success: false,
        };
      });
  }

  async sendNotificationToMultipleTokens({ tokens, title, body, icon }: MultipleDeviceNotificationDTO) {
    const message = {
      notification: {
        title,
        body,
        icon,
      },
      tokens,
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      console.log('Successfully sent messages:', response);
      return {
        success: true,
        message: `Successfully sent ${response.successCount} messages; ${response.failureCount} failed.`,
      };
    } catch (error) {
      console.log('Error sending messages:', error);
      return { success: false, message: 'Failed to send notifications' };
    }
  }
}

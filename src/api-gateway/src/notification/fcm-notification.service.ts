import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

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
}

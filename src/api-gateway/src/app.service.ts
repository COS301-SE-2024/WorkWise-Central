import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getFileByName(name: string, res: Response) {
    const filePath = join(process.cwd(), '..', name);
    return res.sendFile(filePath);
  }
}

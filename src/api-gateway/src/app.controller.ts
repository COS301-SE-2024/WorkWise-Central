import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: ' Get a file from within the system' })
  @Get('/public/:name')
  getFileByName(@Param('name') name: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads', name);
    console.log('FILE PATH: ', filePath);
    return res.sendFile(filePath);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

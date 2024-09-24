import { Global, Inject, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import * as mime from 'mime-types';
import { join } from 'path';
import { SaveBase64Response } from './dto/SaveBase64Response.dto';

const uploadPath = join(__dirname, '..', '../../../uploads');

@Global()
@Injectable()
export class FileService {
  constructor(@Inject('GLOBAL_SERVER_URL') private serverUrl: string) {}

  async uploadBase64Image(base64Image: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) {
          console.log('FileService failed to upload: ', error);
          return reject(error);
        }
        resolve(result);
      });

      toStream(base64Image).pipe(upload);
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }

  removeAfterLastDot(input: string): string | null {
    const lastDotIndex = input.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return null;
    }
    return input.substring(0, lastDotIndex);
  }

  keepAfterLastDot(input: string): string {
    const lastDotIndex = input.lastIndexOf('.');
    return input.substring(lastDotIndex);
  }

  async saveAttachments(files: Express.Multer.File[]): Promise<string[]> {
    if (!fs.existsSync(uploadPath)) {
      //console.log('FAILED TO FIND FILE');
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const fileLinks: string[] = [];

    for (const file of files) {
      const name = this.removeAfterLastDot(file.originalname);
      const extension = this.keepAfterLastDot(file.originalname);

      const fileName = `${uuidv4()}-${name}${extension}`;
      const filePath = path.join(uploadPath, fileName);
      fs.writeFileSync(filePath, file.buffer);
      fileLinks.push(this.serverUrl + `uploads/${fileName}`);
      console.log('SAVING:', `/uploads/${fileName}`);
    }

    return fileLinks;
  }

  // getMimeTypeFromBase64(base64: string): string | null {
  //   const match = base64.match(/^data:(.*?);base64,/);
  //   return match ? match[1] : null;
  // }

  getFileExtension(base64: string): string | false {
    const match = base64.match(/^data:(.*?);base64,/);
    if (!match) {
      return false;
    }
    const mimeType = match[1];
    return mime.extension(mimeType);
  }

  async saveBase64File(base64Image: string): Promise<SaveBase64Response> {
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    let fileLink: string = '';
    const extension = this.getFileExtension(base64Image);
    if (!extension) {
      return new SaveBase64Response(false);
    }

    const fileName = `${uuidv4()}-${uuidv4()}${extension}`;
    const filePath = path.join(uploadPath, fileName);

    // Decode the Base64 string
    const base64Data = base64Image.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

    fileLink = this.serverUrl + `uploads/${fileName}`;
    console.log('SAVING:', fileLink);

    return new SaveBase64Response(true, fileLink);
  }

  /*
  async saveBase64Files(base64Files: { base64: string; originalname: string }[]): Promise<string[]> {
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const fileLinks: string[] = [];

    for (const file of base64Files) {
      const name = this.removeAfterLastDot(file.originalname);
      const extension = this.keepAfterLastDot(file.originalname);

      const fileName = `${uuidv4()}-${name}-${uuidv4()}${extension}`;
      const filePath = path.join(uploadPath, fileName);

      // Decode the Base64 string
      const base64Data = file.base64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

      fileLinks.push(`uploads/${fileName}`);
      console.log('SAVING:', `/uploads/${fileName}`);
    }

    return fileLinks;
  }
*/
}

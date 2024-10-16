import { Global, Inject, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
//import * as path from 'path';
//import * as fs from 'fs';
//import { v4 as uuidv4 } from 'uuid';
//import * as mime from 'mime-types';
//import { join } from 'path';
//import { SaveBase64Response } from './dto/SaveBase64Response.dto';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
//const uploadPath = join(__dirname, '..', '../../../uploads');

@Global()
@Injectable()
export class FileService {
  //private readonly uploadPath: string;
  constructor(
    private configService: ConfigService,
    @Inject('GLOBAL_CONFIG')
    private readonly globalConfig: { serverUrl: string; frontendUrl: string; aws_key: string; aws_secret: string },
  ) {
    //this.uploadPath = this.configService.get<string>('UPLOAD_PATH') || join(__dirname, '..', '../../../uploads');
  }
  ///
  AWS_S3_BUCKET = 'wwcentral-rsa';
  other_AWS_S3_BUCKET = 'work-wise-central';
  s3 = new AWS.S3({
    accessKeyId: this.globalConfig.aws_key,
    secretAccessKey: this.globalConfig.aws_secret,
  });

  async uploadFileAWS(file) {
    console.log(file);
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.other_AWS_S3_BUCKET,
      originalname + '-' + randomStringGenerator(),
      file.mimetype,
    );
  }

  async uploadFilesAWS(files: Express.Multer.File[]) {
    const uploadPromises = files.map((file) => {
      const { originalname } = file;
      return this.s3_upload(
        file.buffer,
        this.other_AWS_S3_BUCKET,
        originalname + '-' + randomStringGenerator(),
        file.mimetype,
      );
    });

    return await Promise.all(uploadPromises);
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      console.log(s3Response);
      return s3Response.Location;
    } catch (e) {
      console.log(e);
    }
  }

  /*
  async uploadBase64ImageAWS(base64Image: string) {
    const base64Data = Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    const type = base64Image.split(';')[0].split('/')[1];
    const name = 'profileimage-' + randomStringGenerator();
    return await this.s3_upload(base64Data, this.other_AWS_S3_BUCKET, name, type)[0];

    /!*    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: randomStringGenerator(),
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    let location = '';
    const key = '';
    try {
      const s3Response = await this.s3.upload(params).promise();
      location = s3Response.Location;
    } catch (error) {
      console.log(error);
    }

    console.log(location, key);

    return location;*!/
  }
*/

  ///
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

  /*
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
*/

  /*  async saveAttachments(files: Express.Multer.File[]): Promise<string[]> {
    if (!fs.existsSync(this.uploadPath)) {
      console.log('FAILED TO FIND FILE');
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }

    const fileLinks: string[] = [];

    for (const file of files) {
      const name = this.removeAfterLastDot(file.originalname);
      const extension = this.keepAfterLastDot(file.originalname);

      const fileName = `${uuidv4()}-${name}${extension}`;
      const filePath = path.join(this.uploadPath, fileName);
      fs.writeFileSync(filePath, file.buffer);
      fileLinks.push(this.globalConfig.serverUrl + `uploads/${fileName}`);
      console.log('SAVING:', `/uploads/${fileName}`);
    }

    return fileLinks;
  }*/

  // getMimeTypeFromBase64(base64: string): string | null {
  //   const match = base64.match(/^data:(.*?);base64,/);
  //   return match ? match[1] : null;
  // }

  /*  getFileExtension(base64: string): string | false {
    const match = base64.match(/^data:(.*?);base64,/);
    if (!match) {
      return false;
    }
    const mimeType = match[1];
    return mime.extension(mimeType);
  }*/

  /*  async saveBase64File(base64Image: string): Promise<SaveBase64Response> {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }

    let fileLink: string = '';
    const extension = this.getFileExtension(base64Image);
    if (!extension) {
      console.log('No extension', extension);
      return new SaveBase64Response(false);
    }

    const fileName = `File-${uuidv4()}.${extension}`;
    const filePath = path.join(this.uploadPath, fileName);

    // Decode the Base64 string
    const base64Data = base64Image.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

    fileLink = this.globalConfig.serverUrl + `uploads/${fileName}`;
    console.log('SAVING:', fileLink);

    return new SaveBase64Response(true, fileLink);
  }*/

  /*
  async saveBase64Files(base64Files: { base64: string; originalname: string }[]): Promise<string[]> {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }

    const fileLinks: string[] = [];

    for (const file of base64Files) {
      const name = this.removeAfterLastDot(file.originalname);
      const extension = this.keepAfterLastDot(file.originalname);

      const fileName = `${uuidv4()}-${name}-${uuidv4()}${extension}`;
      const filePath = path.join(this.uploadPath, fileName);

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

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { makeSize } from 'src/utils/makeSize';

@Injectable()
export class S3Service {
  constructor(public configService: ConfigService) {}

  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });

  async uploadFileIntoFolderS3(file, path) {
    const fileType = file.mimetype.split('/');

    const params = {
      Bucket: this.AWS_S3_BUCKET,

      Key: `${path}/${new Date().getTime()}.${fileType[1]}`,

      Body: file.buffer,

      ContentType: file.mimetype,
    };

    try {
      const s3Response = await this.s3.upload(params).promise();

      return {
        message: 'File uploaded successfully!',
        data: {
          fileName: file.originalname,
          filePath: s3Response.Location,
          fileSize: makeSize(file.size),
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async moveFileFromTempFolderS3(fileUrl: string, newFolderPath: string) {
    const fileName = fileUrl.split('/').pop();

    const params = {
      Bucket: this.AWS_S3_BUCKET,
      CopySource: `${this.AWS_S3_BUCKET}/temp/${fileName}`,
      Key: `${newFolderPath}`,
    };

    try {
      const s3Response = await this.s3.copyObject(params).promise();
      return s3Response;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

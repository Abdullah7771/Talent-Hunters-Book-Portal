import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBody,
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiExcludeController,
} from '@nestjs/swagger';
import { S3Service } from './s3.service';

@ApiExcludeController()
@ApiTags('files')
@Controller('files')
export class S3Controller {
  constructor(private s3Service: S3Service) {}

  @Post('/upload')
  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file) {
    try {
      const pictureObject = await this.s3Service.uploadFileIntoFolderS3(
        file,
        'books/picture',
      );

      return {
        url: pictureObject.data.filePath,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

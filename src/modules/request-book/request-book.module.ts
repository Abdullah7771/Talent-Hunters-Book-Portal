import { Module } from '@nestjs/common';
import { RequestBookController } from './request-book.controller';
import { RequestBookService } from './request-book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestBook, RequestBookSchema } from './schema/requested-book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RequestBook.name, schema: RequestBookSchema },
    ]),
  ],
  controllers: [RequestBookController],
  providers: [RequestBookService],
})
export class RequestBookModule {}

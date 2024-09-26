import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book, BookSchema } from './schema/book.schema';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    S3Module,
  ],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService],
})
export class BookModule {}

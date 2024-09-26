import { Module } from '@nestjs/common';
import { SoldOutBookController } from './soldout-book.controller';
import { SoldOutBookService } from './soldout-book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SoldOutBook, SoldOutBookSchema } from './schema/soldout-book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SoldOutBook.name, schema: SoldOutBookSchema },
    ]),
  ],
  controllers: [SoldOutBookController],
  providers: [SoldOutBookService],
})
export class SoldOutBookModule {}

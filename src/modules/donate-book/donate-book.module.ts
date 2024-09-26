import { Module } from '@nestjs/common';
import { DonateBookController } from './donate-book.controller';
import { DonateBookService } from './donate-book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DonateBook, DonateBookSchema } from './schema/donate-book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DonateBook.name, schema: DonateBookSchema },
    ]),
  ],
  controllers: [DonateBookController],
  providers: [DonateBookService],
})
export class DonateBookModule {}

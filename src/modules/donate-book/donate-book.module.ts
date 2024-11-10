import { Module } from '@nestjs/common';
import { DonateBookController } from './donate-book.controller';
import { DonateBookService } from './donate-book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DonateBook, DonateBookSchema } from './schema/donate-book.schema';
import { DonateBookRepository } from './donate-book.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DonateBook.name, schema: DonateBookSchema },
    ]),
  ],
  controllers: [DonateBookController],
  providers: [DonateBookService, DonateBookRepository],
  exports: [DonateBookService],
})
export class DonateBookModule {}

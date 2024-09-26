import { Module } from '@nestjs/common';
import { OrderBookService } from './order-book.service';
import { OrderBook, OrderBookSchema } from './schema/order-book.schema';
import { OrderBookController } from './order-book.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderBook.name, schema: OrderBookSchema },
    ]),
  ],
  controllers: [OrderBookController],
  providers: [OrderBookService],
})
export class OrderBookModule {}

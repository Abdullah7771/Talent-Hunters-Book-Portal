import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { User } from '../user/schema/user.schema';
import { OrderBook, OrderBookDocument } from './schema/order-book.schema';

@Injectable()
export class OrderBookRepository extends EntityRepository<OrderBookDocument> {
  constructor(
    @InjectModel(OrderBook.name)
    private orderBookModel: Model<OrderBookDocument>,
  ) {
    super(orderBookModel);
  }
}

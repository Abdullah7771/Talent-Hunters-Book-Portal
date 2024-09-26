import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderBook, OrderBookDocument } from './schema/order-book.schema';
import { CreateOrderBookDto } from './dto/createOrderBook.dto';

@Injectable()
export class OrderBookService {
  constructor(
    @InjectModel(OrderBook.name)
    private readonly orderBookModel: Model<OrderBookDocument>,
  ) {}

  async create(createOrderBookDto: CreateOrderBookDto): Promise<OrderBook> {
    const createdOrderBook = new this.orderBookModel(createOrderBookDto);
    return createdOrderBook.save();
  }

  async findAll(): Promise<OrderBook[]> {
    return this.orderBookModel.find().exec();
  }

  async findOne(id: string): Promise<OrderBook> {
    const orderBook = await this.orderBookModel.findById(id).exec();
    if (!orderBook) {
      throw new NotFoundException(`OrderBook with ID ${id} not found`);
    }
    return orderBook;
  }

  async remove(id: string): Promise<void> {
    const result = await this.orderBookModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`OrderBook with ID ${id} not found`);
    }
  }
}

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions, Types } from 'mongoose';
import { OrderBook, OrderBookDocument } from './schema/order-book.schema';
import { CreateOrderBookDto } from './dto/createOrderBook.dto';
import { RequestBook } from '../request-book/schema/requested-book.schema';
import { OrderBookRepository } from './order-book.repository';

@Injectable()
export class OrderBookService {
  constructor(private readonly orderBookRepository: OrderBookRepository) {}

  async create(
    { bookId }: CreateOrderBookDto,
    userId: Types.ObjectId,
  ): Promise<OrderBook> {
    try {
      return await this.orderBookRepository.create({
        book: bookId,
        user: userId,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOrderedBooks({
    filterQuery,
    projection,
    populateOptions,
    checkExistingOne = true,
    sort,
    limit,
    offset,
  }: {
    filterQuery: FilterQuery<OrderBookDocument>;
    projection?: Record<string, unknown>;
    populateOptions?: PopulateOptions | (string | PopulateOptions)[];
    sort?: Record<string, 1 | -1>;
    checkExistingOne?: boolean;
    limit?: number;
    offset?: number;
  }) {
    try {
      return this.orderBookRepository.find({
        filterQuery,
        projection,
        populateOptions,
        checkExistingOne,
        sort,
        limit,
        offset,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOrderBook({
    filterQuery,
    projection,
    populateOptions,
    checkExistingOne,
  }: {
    filterQuery: FilterQuery<OrderBookDocument>;
    projection?: Record<string, unknown>;
    populateOptions?: PopulateOptions | (string | PopulateOptions)[];
    checkExistingOne?: boolean;
  }) {
    try {
      return this.orderBookRepository.findOne({
        filterQuery,
        projection,
        populateOptions,
        checkExistingOne,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    orderBookId: string,
    updateFlagDto: CreateOrderBookDto,
  ): Promise<OrderBook> {
    try {
      return await this.orderBookRepository.findOneAndUpdate(
        { _id: orderBookId },
        updateFlagDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(orderBookId: string): Promise<any> {
    try {
      return await this.orderBookRepository.deleteOne({
        _id: orderBookId,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getOrderBookById(orderBookId: string): Promise<OrderBook> {
    try {
      return await this.orderBookRepository.findById(orderBookId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllOrderBooks(): Promise<OrderBook[]> {
    try {
      return await this.orderBookRepository.find({
        filterQuery: {},
        projection: { createdAt: 0, updatedAt: 0, __v: 0 },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

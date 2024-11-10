import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions, Types } from 'mongoose';
import {
  RequestBook,
  RequestBookDocument,
} from './schema/requested-book.schema';
import { CreateRequestBookDto } from './dto/createRequestedBook.dto';
import { UpdateRequestBookDto } from './dto/updateRequestedBook.dto';
import { RequestBookRepository } from './request-book.repository';

@Injectable()
export class RequestBookService {
  constructor(private readonly requestBookRepository: RequestBookRepository) {}

  async create(
    requestBookDto: CreateRequestBookDto,
    userId: Types.ObjectId,
  ): Promise<RequestBook> {
    try {
      return await this.requestBookRepository.create({
        ...requestBookDto,
        user: userId,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findRequestedBooks({
    filterQuery,
    projection,
    populateOptions,
    checkExistingOne = true,
    sort,
    limit,
    offset,
  }: {
    filterQuery: FilterQuery<RequestBookDocument>;
    projection?: Record<string, unknown>;
    populateOptions?: PopulateOptions | (string | PopulateOptions)[];
    sort?: Record<string, 1 | -1>;
    checkExistingOne?: boolean;
    limit?: number;
    offset?: number;
  }) {
    try {
      return this.requestBookRepository.find({
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

  async findRequestBook({
    filterQuery,
    projection,
    populateOptions,
    checkExistingOne,
  }: {
    filterQuery: FilterQuery<RequestBookDocument>;
    projection?: Record<string, unknown>;
    populateOptions?: PopulateOptions | (string | PopulateOptions)[];
    checkExistingOne?: boolean;
  }) {
    try {
      return this.requestBookRepository.findOne({
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
    requestedBookId: string,
    updateFlagDto: CreateRequestBookDto,
  ): Promise<RequestBook> {
    try {
      return await this.requestBookRepository.findOneAndUpdate(
        { _id: requestedBookId },
        updateFlagDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(requestedBookId: string): Promise<any> {
    try {
      return await this.requestBookRepository.deleteOne({
        _id: requestedBookId,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getRequestedBookById(requestedBookId: string): Promise<RequestBook> {
    try {
      return await this.requestBookRepository.findById(requestedBookId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllRequestedBooks(): Promise<RequestBook[]> {
    try {
      return await this.requestBookRepository.find({
        filterQuery: {},
        projection: { createdAt: 0, updatedAt: 0, __v: 0 },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

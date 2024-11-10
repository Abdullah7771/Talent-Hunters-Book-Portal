import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions, Types } from 'mongoose';
import { DonateBook, DonateBookDocument } from './schema/donate-book.schema';
import { CreateDonateBookDto } from './dto/createDonateBook.dto';
import { UpdateDonateBookDto } from './dto/updateDonateBook.dto';
import { DonateBookRepository } from './donate-book.repository';

@Injectable()
export class DonateBookService {
  constructor(private readonly donateBookRepository: DonateBookRepository) {}

  async create(
    createDonateBookDto: CreateDonateBookDto,
    userId: Types.ObjectId,
  ): Promise<DonateBook> {
    return await this.donateBookRepository.create({
      ...createDonateBookDto,
      user: userId,
    });
  }

  async findAll(): Promise<DonateBook[]> {
    return await this.donateBookRepository.find({ filterQuery: {} });
  }

  async update(
    orderBookId: string,
    updateFlagDto: CreateDonateBookDto,
  ): Promise<DonateBook> {
    try {
      return await this.donateBookRepository.findOneAndUpdate(
        { _id: orderBookId },
        updateFlagDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(orderBookId: string): Promise<any> {
    try {
      return await this.donateBookRepository.deleteOne({
        _id: orderBookId,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findDonateBooks({
    filterQuery,
    projection,
    populateOptions,
    checkExistingOne = true,
    sort,
    limit,
    offset,
  }: {
    filterQuery: FilterQuery<DonateBookDocument>;
    projection?: Record<string, unknown>;
    populateOptions?: PopulateOptions | (string | PopulateOptions)[];
    sort?: Record<string, 1 | -1>;
    checkExistingOne?: boolean;
    limit?: number;
    offset?: number;
  }) {
    try {
      return this.donateBookRepository.find({
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

  async findDonateBook({
    filterQuery,
    projection,
    populateOptions,
    checkExistingOne,
  }: {
    filterQuery: FilterQuery<DonateBookDocument>;
    projection?: Record<string, unknown>;
    populateOptions?: PopulateOptions | (string | PopulateOptions)[];
    checkExistingOne?: boolean;
  }) {
    try {
      return this.donateBookRepository.findOne({
        filterQuery,
        projection,
        populateOptions,
        checkExistingOne,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getDonateBookById(orderBookId: string): Promise<DonateBook> {
    try {
      return await this.donateBookRepository.findById(orderBookId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllDonateBooks(): Promise<DonateBook[]> {
    try {
      return await this.donateBookRepository.find({
        filterQuery: {},
        projection: { createdAt: 0, updatedAt: 0, __v: 0 },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

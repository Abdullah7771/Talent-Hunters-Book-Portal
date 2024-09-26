import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RequestBook,
  RequestBookDocument,
} from './schema/requested-book.schema';
import { CreateRequestBookDto } from './dto/createRequestedBook.dto';
import { UpdateRequestBookDto } from './dto/updateRequestedBook.dto';

@Injectable()
export class RequestBookService {
  constructor(
    @InjectModel(RequestBook.name)
    private readonly requestBookModel: Model<RequestBookDocument>,
  ) {}

  async create(
    createRequestBookDto: CreateRequestBookDto,
  ): Promise<RequestBook> {
    const createdBook = new this.requestBookModel(createRequestBookDto);
    return createdBook.save();
  }

  async findAll(): Promise<RequestBook[]> {
    return this.requestBookModel.find().exec();
  }

  async findOne(id: string): Promise<RequestBook> {
    const book = await this.requestBookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(
    id: string,
    updateRequestBookDto: UpdateRequestBookDto,
  ): Promise<RequestBook> {
    const updatedBook = await this.requestBookModel
      .findByIdAndUpdate(id, updateRequestBookDto, { new: true })
      .exec();
    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return updatedBook;
  }

  async remove(id: string): Promise<void> {
    const result = await this.requestBookModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSoldOutBookDto } from './dto/createSoldOutBook.dto';
import { SoldOutBook, SoldOutBookDocument } from './schema/soldout-book.schema';

@Injectable()
export class SoldOutBookService {
  constructor(
    @InjectModel(SoldOutBook.name)
    private readonly soldOutBookModel: Model<SoldOutBookDocument>,
  ) {}

  async create(
    createSoldOutBookDto: CreateSoldOutBookDto,
  ): Promise<SoldOutBook> {
    const createdSoldOutBook = new this.soldOutBookModel(createSoldOutBookDto);
    return createdSoldOutBook.save();
  }

  async findAll(): Promise<SoldOutBook[]> {
    return this.soldOutBookModel.find().exec();
  }

  async findOne(id: string): Promise<SoldOutBook> {
    const soldOutBook = await this.soldOutBookModel.findById(id).exec();
    if (!soldOutBook) {
      throw new NotFoundException(`SoldOutBook with ID ${id} not found`);
    }
    return soldOutBook;
  }

  async remove(id: string): Promise<void> {
    const result = await this.soldOutBookModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`SoldOutBook with ID ${id} not found`);
    }
  }
}

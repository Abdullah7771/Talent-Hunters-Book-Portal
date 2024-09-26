import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DonateBook, DonateBookDocument } from './schema/donate-book.schema';
import { CreateDonateBookDto } from './dto/createDonateBook.dto';
import { UpdateDonateBookDto } from './dto/updateDonateBook.dto';

@Injectable()
export class DonateBookService {
  constructor(
    @InjectModel(DonateBook.name)
    private readonly donateBookModel: Model<DonateBookDocument>,
  ) {}

  async create(createDonateBookDto: CreateDonateBookDto): Promise<DonateBook> {
    const createdBook = new this.donateBookModel(createDonateBookDto);
    return createdBook.save();
  }

  async findAll(): Promise<DonateBook[]> {
    return this.donateBookModel.find().exec();
  }

  async findOne(id: string): Promise<DonateBook> {
    const book = await this.donateBookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(
    id: string,
    updateDonateBookDto: UpdateDonateBookDto,
  ): Promise<DonateBook> {
    const updatedBook = await this.donateBookModel
      .findByIdAndUpdate(id, updateDonateBookDto, { new: true })
      .exec();
    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return updatedBook;
  }

  async remove(id: string): Promise<void> {
    const result = await this.donateBookModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }
}

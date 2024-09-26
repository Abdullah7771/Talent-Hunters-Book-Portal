import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book, BookDocument } from './schema/book.schema';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    private s3Service: S3Service,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();
    if (!updatedBook) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return updatedBook;
  }

  async remove(id: string): Promise<void> {
    const result = await this.bookModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
  }

  async findAllPaginated(page: number = 1): Promise<Book[]> {
    const ITEMS_PER_PAGE = 10;
    const skip = (page - 1) * ITEMS_PER_PAGE;

    try {
      return await this.bookModel
        .find()
        .skip(skip)
        .limit(ITEMS_PER_PAGE)
        .exec();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching paginated books');
    }
  }

  async findByGrade(grade: string): Promise<Book[]> {
    try {
      return await this.bookModel.find({ grade }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching books by grade');
    }
  }

  async findBySubject(subject: string): Promise<Book[]> {
    try {
      return await this.bookModel.find({ subject }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching books by subject');
    }
  }

  async findByQuery(query: any): Promise<Book[]> {
    try {
      return await this.bookModel.find(query).exec();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching books by query');
    }
  }

  async findById(id: string): Promise<Book> {
    try {
      const book = await this.bookModel.findById(id).exec();
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      return book;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching book by ID');
    }
  }

  async findByName(name: string): Promise<Book[]> {
    try {
      return await this.bookModel.find({ name }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching book by name');
    }
  }

  async findByAuthor(author: string): Promise<Book[]> {
    try {
      return await this.bookModel.find({ author }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching book by author');
    }
  }

  async findAvailableBooks(): Promise<Book[]> {
    try {
      return await this.bookModel.find({ status: 'available' }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching available books');
    }
  }

  async uploadBookPicture(file): Promise<any> {
    const pictureObject = await this.s3Service.uploadFileIntoFolderS3(
      file,
      'book/picture',
    );

    return {
      url: pictureObject.data.filePath,
    };
  }
  catch(error) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
}

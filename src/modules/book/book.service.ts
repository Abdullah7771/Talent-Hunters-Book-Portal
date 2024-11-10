import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { Book, BookDocument } from './schema/book.schema';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';
import { S3Service } from '../s3/s3.service';
import { Grade } from 'src/types/book';
import { BookStatus } from 'src/types/statuses';
import { OrderBookService } from '../order-book/order-book.service';
import { DonateBookService } from '../donate-book/donate-book.service';
import { RequestBookService } from '../request-book/request-book.service';
import { UserDocument } from '../user/schema/user.schema';
import { CreateRequestBookDto } from '../request-book/dto/createRequestedBook.dto';
import { CreateDonateBookDto } from '../donate-book/dto/createDonateBook.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    private s3Service: S3Service,
    private readonly orderBookService: OrderBookService,
    private readonly donateBookService: DonateBookService,
    private readonly requestBookService: RequestBookService,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async orderBook(bookId: string | Types.ObjectId, user: UserDocument) {
    console.log('jasldjasldjalsd', bookId);

    const book = await this.bookModel.findById(bookId);
    console.log('book', book);

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }
    if (book.status === BookStatus.NOT_AVAILABLE) {
      throw new HttpException('Book is not  available', HttpStatus.BAD_REQUEST);
    }
    if (user.books.includes(new Types.ObjectId(bookId))) {
      throw new HttpException(
        'Book is already in your books',
        HttpStatus.BAD_REQUEST,
      );
    }
    const orderBook = await this.orderBookService.create(
      { bookId: book._id },
      user._id,
    );
    return {
      message: 'Book ordered successfully',
    };
  }

  async requestBook(
    createRequestBookDto: CreateRequestBookDto,
    user: UserDocument,
  ) {
    const book = await this.bookModel.findOne({
      title: createRequestBookDto.title,
    });
    if (book) {
      throw new HttpException(
        'Book is already in our database',
        HttpStatus.BAD_REQUEST,
      );
    }

    const requestBook = await this.requestBookService.create(
      createRequestBookDto,
      user._id,
    );
    return {
      message: 'Book requested successfully',
    };
  }

  async donateBook(
    createDonateBookDto: CreateDonateBookDto,
    user: UserDocument,
  ) {
    return await this.donateBookService.create(createDonateBookDto, user._id);
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async filterQueryBooks({
    title,
    subject,
    grade,
    status,
    page = 1,
    pageSize = 10,
  }: {
    title: string;
    subject: string;
    grade: Grade;
    status: BookStatus;
    page: number;
    pageSize: number;
  }) {
    try {
      const query: any = {};

      // Add filters based on provided parameters
      if (title) {
        query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
      }
      if (subject) {
        query.subject = { $regex: subject, $options: 'i' };
      }
      if (grade) {
        query.grade = grade;
      }
      if (status) {
        query.status = status;
      }
      page = Number(page);

      const books = await this.bookModel
        .find(query)
        .skip((Number(page) - 1) * pageSize) // Pagination
        .limit(pageSize) // Limit results per page
        .exec();

      const total = await this.bookModel.countDocuments(query); // Get total count for pagination

      return {
        total,
        page,
        pageSize,
        books,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error fetching books');
    }
  }
  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async findFilterQuery(filterQuery: FilterQuery<Book>): Promise<Book[]> {
    try {
      const books = await this.bookModel.find(filterQuery).exec();
      if (!books) {
        throw new NotFoundException(`Book  not found`);
      }
      return books;
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
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

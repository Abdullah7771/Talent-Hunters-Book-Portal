import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ROLES } from 'src/types/roles';
import { BookService } from '../book/book.service';
import { RequestBookService } from '../request-book/request-book.service';
import { OrderBookService } from '../order-book/order-book.service';
import { Book } from '../book/schema/book.schema';
import { DonateBookService } from '../donate-book/donate-book.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,

    private readonly bookService: BookService,
    private readonly requestBookService: RequestBookService,
    private readonly donateBookService: DonateBookService,

    private readonly orderBookService: OrderBookService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    console.log(id, 'id');

    const user = await this.userModel
      .findById(id)
      .populate('books')
      .populate('requestedBooks')
      .populate('orderedBooks')
      .exec();

    console.log(user, 'user');

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel({
      ...createUserDto,
      role: ROLES.USER,
    });
    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findUsers({
    filterQuery,
    projection,
    populateOptions,
    checkExistingOne = true,
    sort,
    limit,
    offset,
  }: {
    filterQuery: FilterQuery<UserDocument>;
    projection?: Record<string, unknown>;
    populateOptions?: PopulateOptions | (string | PopulateOptions)[];
    sort?: Record<string, 1 | -1>;
    checkExistingOne?: boolean;
    limit?: number;
    offset?: number;
  }) {
    try {
      return this.userModel.find({
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

  async findUser({
    filterQuery,
    projection,
    populateOptions,
    checkExistingOne,
  }: {
    filterQuery: FilterQuery<UserDocument>;
    projection?: Record<string, unknown>;
    populateOptions?: PopulateOptions | (string | PopulateOptions)[];
    checkExistingOne?: boolean;
  }) {
    try {
      return this.userModel.findOne({
        filterQuery,
        projection,
        populateOptions,
        checkExistingOne,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByName(name: string): Promise<User[]> {
    return this.userModel.find({ username: name }).exec();
  }

  async findByFamilyName(familyName: string): Promise<User[]> {
    return this.userModel.find({ familyName }).exec();
  }

  async fetchMyBooks(user: UserDocument): Promise<Book[] | any> {
    return user.books;
  }

  async fetchMyOrderedBooks(user: UserDocument): Promise<Book[] | any> {
    try {
      return await this.orderBookService.findOrderedBooks({
        filterQuery: { user: user._id },
      });
    } catch (error) {
      throw new NotFoundException('Ordered books not found');
    }
  }

  async fetchMyDonatedBooks(user: UserDocument): Promise<Book[] | any> {
    try {
      return await this.donateBookService.findDonateBooks({
        filterQuery: { user: user._id },
      });
    } catch (error) {
      throw new NotFoundException('Ordered books not found');
    }
  }

  async fetchMyRequestedBooks(user: UserDocument): Promise<Book[] | any> {
    try {
      return await this.requestBookService.findRequestedBooks({
        filterQuery: {
          user: user._id,
        },
      });
    } catch (error) {
      throw new NotFoundException('Requested books not found');
    }
  }
}

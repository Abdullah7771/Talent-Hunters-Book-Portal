import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { BookService } from '../book/book.service';
import { DonateBookService } from '../donate-book/donate-book.service';
import { OrderBookService } from '../order-book/order-book.service';
import { RequestBookService } from '../request-book/request-book.service';
import { UserService } from '../user/user.service';
import { JwtUserGuard } from 'src/guards/jwt-user.guard';
import { CreateBookDto } from '../book/dto/createBook.dto';
import { Book } from '../book/schema/book.schema';
import { RolesGuard } from 'src/guards/role.guard';
import { HasRoles } from 'src/guards/roles.decorator';
import { ROLES } from 'src/types/roles';
import { ApiQuery } from '@nestjs/swagger';
import { Grade } from 'src/types/book';
import { BookStatus } from 'src/types/statuses';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly bookService: BookService,
    private readonly requestBookService: RequestBookService,
    private readonly donateBookService: DonateBookService,

    private readonly orderBookService: OrderBookService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtUserGuard, RolesGuard)
  @HasRoles(ROLES.ADMIN)
  @Post('/books/add')
  async addBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.create(createBookDto);
  }

  @UseGuards(JwtUserGuard, RolesGuard)
  @HasRoles(ROLES.ADMIN)
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'subject', required: false })
  @ApiQuery({ name: 'grade', required: false, enum: Grade })
  @ApiQuery({ name: 'status', required: false, enum: BookStatus })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @Get('books/all')
  async fetchAllBooks(
    @Query('title') title: string,
    @Query('subject') subject: string,
    @Query('grade') grade: Grade,
    @Query('status') status: BookStatus,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<any> {
    return await this.bookService.filterQueryBooks({
      title,
      subject,
      grade,
      status,
      page,
      pageSize,
    });
  }

  @UseGuards(JwtUserGuard, RolesGuard)
  @HasRoles(ROLES.ADMIN)
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'subject', required: false })
  @ApiQuery({ name: 'grade', required: false, enum: Grade })
  @ApiQuery({ name: 'status', required: false, enum: BookStatus })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @Get('donated-books/all')
  async fetchDonatedBooks(
    @Query('title') title: string,
    @Query('subject') subject: string,
    @Query('grade') grade: Grade,
    @Query('status') status: BookStatus,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<any> {
    return await this.bookService.filterQueryBooks({
      title,
      subject,
      grade,
      status,
      page,
      pageSize,
    });
  }
}

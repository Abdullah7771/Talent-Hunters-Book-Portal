import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Req,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';
import { Book } from './schema/book.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtUserGuard } from 'src/guards/jwt-user.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Grade } from 'src/types/book';
import { BookStatus } from 'src/types/statuses';
import { ValidateMongoIdPipe } from 'src/pipes/ObjectId.pipe';
import { ExtendedRequest } from 'src/utils/extendedRequest.interface';
import { CreateRequestBookDto } from '../request-book/dto/createRequestedBook.dto';
import { CreateDonateBookDto } from '../donate-book/dto/createDonateBook.dto';

@ApiBearerAuth('jwt')
@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(JwtUserGuard)
  @Post('/add')
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.create(createBookDto);
  }

  @UseGuards(JwtUserGuard)
  @Post('/order/:bookId')
  async orderBook(
    @Param('bookId', new ValidateMongoIdPipe()) bookId: string,
    @Req() req: ExtendedRequest,
  ): Promise<Book | any> {
    const user = req?.user;
    return this.bookService.orderBook(bookId, user);
  }

  @UseGuards(JwtUserGuard)
  @Post('/request')
  async requestBook(
    @Body() createRequestBookDto: CreateRequestBookDto,
    @Req() req: ExtendedRequest,
  ): Promise<Book | any> {
    const user = req?.user;
    return this.bookService.requestBook(createRequestBookDto, user);
  }

  @UseGuards(JwtUserGuard)
  @Post('/donate')
  async donateBooks(
    @Body() donateBookDto: CreateDonateBookDto,
    @Req() req: ExtendedRequest,
  ): Promise<Book | any> {
    const user = req?.user;
    return this.bookService.donateBook(donateBookDto, user);
  }

  @UseGuards(JwtUserGuard)
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'subject', required: false })
  @ApiQuery({ name: 'grade', required: false, enum: Grade })
  @ApiQuery({ name: 'status', required: false, enum: BookStatus })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @Get('all')
  async findAll(
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

  @UseGuards(JwtUserGuard)
  @Get('/by/:id')
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @UseGuards(JwtUserGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.update(id, updateBookDto);
  }

  @UseGuards(JwtUserGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.bookService.remove(id);
  }

  @UseGuards(JwtUserGuard)
  @Post('picture')
  @UseGuards(JwtUserGuard)
  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadBookPicture(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
        ],
      }),
    )
    file,
  ) {
    return this.bookService.uploadBookPicture(file);
  }
}

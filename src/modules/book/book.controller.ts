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
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';
import { Book } from './schema/book.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtUserGuard } from 'src/guards/jwt-user.guard';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.create(createBookDto);
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.bookService.remove(id);
  }

  @Get('pagination')
  @UseGuards(JwtUserGuard)
  async getBooksWithPagination(@Query('page') page: number) {
    return this.bookService.findAllPaginated(page);
  }

  @Get('class')
  @UseGuards(JwtUserGuard)
  async getBooksByGrade(@Query('grade') grade: string) {
    return this.bookService.findByGrade(grade);
  }

  @Get('queryall')
  @UseGuards(JwtUserGuard)
  async getBooksByQuery(@Query() query: any) {
    return this.bookService.findByQuery(query);
  }

  @Get('subject')
  @UseGuards(JwtUserGuard)
  async getBooksBySubject(@Query('name') subject: string) {
    return this.bookService.findBySubject(subject);
  }

  @Get(':id')
  @UseGuards(JwtUserGuard)
  async getBookById(@Param('id') id: string) {
    return this.bookService.findById(id);
  }

  @Get('fetch/bookname')
  @UseGuards(JwtUserGuard)
  async getBookByName(@Query('name') name: string) {
    return this.bookService.findByName(name);
  }

  @Get('fetch/author')
  @UseGuards(JwtUserGuard)
  async getBookByAuthor(@Query('name') author: string) {
    return this.bookService.findByAuthor(author);
  }

  @Get('available/fetch')
  @UseGuards(JwtUserGuard)
  async getAvailableBooks() {
    return this.bookService.findAvailableBooks();
  }

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

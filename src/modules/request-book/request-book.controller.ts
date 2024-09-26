import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  RequestBook,
  RequestBookDocument,
} from './schema/requested-book.schema';
import { RequestBookService } from './request-book.service';
import { CreateRequestBookDto } from './dto/createRequestedBook.dto';
import { UpdateRequestBookDto } from './dto/updateRequestedBook.dto';

@Controller('requested-books')
export class RequestBookController {
  constructor(private readonly requestBookService: RequestBookService) {}

  @Post()
  async create(
    @Body() createRequestBookDto: CreateRequestBookDto,
  ): Promise<RequestBook> {
    return this.requestBookService.create(createRequestBookDto);
  }

  @Get()
  async findAll(): Promise<RequestBook[]> {
    return this.requestBookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RequestBook> {
    return this.requestBookService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRequestBookDto: UpdateRequestBookDto,
  ): Promise<RequestBook> {
    return this.requestBookService.update(id, updateRequestBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.requestBookService.remove(id);
  }
}

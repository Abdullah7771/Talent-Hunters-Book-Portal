import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateSoldOutBookDto } from './dto/createSoldOutBook.dto';
import { SoldOutBook } from './schema/soldout-book.schema';
import { SoldOutBookService } from './soldout-book.service';

@Controller('order-books')
export class SoldOutBookController {
  constructor(private readonly soldOutBookService: SoldOutBookService) {}

  @Post()
  async create(
    @Body() createSoldOutBookDto: CreateSoldOutBookDto,
  ): Promise<SoldOutBook> {
    return this.soldOutBookService.create(createSoldOutBookDto);
  }

  @Get()
  async findAll(): Promise<SoldOutBook[]> {
    return this.soldOutBookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SoldOutBook> {
    return this.soldOutBookService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.soldOutBookService.remove(id);
  }
}

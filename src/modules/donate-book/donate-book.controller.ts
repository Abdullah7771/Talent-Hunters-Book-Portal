import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DonateBookService } from './donate-book.service';
import { CreateDonateBookDto } from './dto/createDonateBook.dto';
import { UpdateDonateBookDto } from './dto/updateDonateBook.dto';
import { DonateBook } from './schema/donate-book.schema';

@Controller('donate-books')
export class DonateBookController {
  constructor(private readonly donateBookService: DonateBookService) {}

  @Post()
  async create(
    @Body() createDonateBookDto: CreateDonateBookDto,
  ): Promise<DonateBook> {
    return this.donateBookService.create(createDonateBookDto);
  }

  @Get()
  async findAll(): Promise<DonateBook[]> {
    return this.donateBookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DonateBook> {
    return this.donateBookService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDonateBookDto: UpdateDonateBookDto,
  ): Promise<DonateBook> {
    return this.donateBookService.update(id, updateDonateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.donateBookService.remove(id);
  }
}

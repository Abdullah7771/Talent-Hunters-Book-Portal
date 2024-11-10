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
}

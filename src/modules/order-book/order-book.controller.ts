import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateOrderBookDto } from './dto/createOrderBook.dto';
import { OrderBookService } from './order-book.service';
import { OrderBook } from './schema/order-book.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ordered Books')
@Controller('order-books')
export class OrderBookController {
  constructor(private readonly orderBookService: OrderBookService) {}
}

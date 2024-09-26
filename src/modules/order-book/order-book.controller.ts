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

@Controller('order-books')
export class OrderBookController {
  constructor(private readonly orderBookService: OrderBookService) {}

  @Post()
  async create(
    @Body() createOrderBookDto: CreateOrderBookDto,
  ): Promise<OrderBook> {
    return this.orderBookService.create(createOrderBookDto);
  }

  @Get()
  async findAll(): Promise<OrderBook[]> {
    return this.orderBookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderBook> {
    return this.orderBookService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.orderBookService.remove(id);
  }
}

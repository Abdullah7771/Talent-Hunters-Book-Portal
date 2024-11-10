import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
  UseGuards,
  Patch,
} from '@nestjs/common';
import {
  RequestBook,
  RequestBookDocument,
} from './schema/requested-book.schema';
import { RequestBookService } from './request-book.service';
import { CreateRequestBookDto } from './dto/createRequestedBook.dto';
import { UpdateRequestBookDto } from './dto/updateRequestedBook.dto';
import { ApiTags } from '@nestjs/swagger';
import { ExtendedRequest } from 'src/utils/extendedRequest.interface';
import { JwtUserGuard } from 'src/guards/jwt-user.guard';

@ApiTags('Requested Books')
@Controller('requested-books')
export class RequestBookController {
  constructor(private readonly requestBookService: RequestBookService) {}

  @UseGuards(JwtUserGuard)
  @Post('add')
  async create(
    @Body() createRequestBookDto: CreateRequestBookDto,
    @Req() req: ExtendedRequest,
  ): Promise<RequestBook> {
    return this.requestBookService.create(createRequestBookDto, req?.user?.id);
  }
}

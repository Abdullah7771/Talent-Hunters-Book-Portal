import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from '../user/user.module';
import { BookModule } from '../book/book.module';
import { DonateBookModule } from '../donate-book/donate-book.module';
import { OrderBookModule } from '../order-book/order-book.module';
import { RequestBookModule } from '../request-book/request-book.module';

@Module({
  imports: [
    BookModule,
    RequestBookModule,
    OrderBookModule,
    DonateBookModule,
    UserModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

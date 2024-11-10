import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BookModule } from '../book/book.module';
import { RequestBookModule } from '../request-book/request-book.module';
import { OrderBookModule } from '../order-book/order-book.module';
import { DonateBookModule } from '../donate-book/donate-book.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    BookModule,
    RequestBookModule,
    OrderBookModule,
    DonateBookModule,
  ],

  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

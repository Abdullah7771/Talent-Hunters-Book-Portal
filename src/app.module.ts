import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBConfigService } from './config/mongodb.config.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { SoldOutBookModule } from './modules/soldout-book/soldout-book.module';
import { RequestBookModule } from './modules/request-book/request-book.module';
import { OrderBookModule } from './modules/order-book/order-book.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongoDBConfigService,
    }),
    UserModule,
    AuthModule,
    BookModule,
    SoldOutBookModule,
    RequestBookModule,
    OrderBookModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

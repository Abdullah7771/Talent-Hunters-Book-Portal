import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderBookDocument = Document & OrderBook;

@Schema({ timestamps: true })
export class OrderBook {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  book: Types.ObjectId;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const OrderBookSchema = SchemaFactory.createForClass(OrderBook);

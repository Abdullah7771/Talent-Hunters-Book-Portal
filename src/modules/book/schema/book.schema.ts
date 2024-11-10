import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  subject: string;

  @Prop({ type: String })
  status: string;

  @Prop({ type: Number })
  publishingYear: number;

  @Prop({ type: String })
  grade: string;

  @Prop({ type: Number })
  count: number;

  @Prop({ type: String })
  author: string;

  @Prop({ type: Array })
  images: string[];

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);

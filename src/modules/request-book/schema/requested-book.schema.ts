import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RequestBookStatus } from '../request-book.types';

export type RequestBookDocument = Document & RequestBook;

@Schema({ timestamps: true })
export class RequestBook {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  subject: string;

  @Prop({
    type: String,
    enum: Object.values(RequestBookStatus),
    // default: AccountStatus.PENDING,
  })
  status: RequestBookStatus;

  @Prop({ type: Number })
  publishingYear: number;

  @Prop({ type: String })
  grade: string;

  @Prop({ type: Number })
  quantity: number;

  @Prop({ type: String })
  author: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  contact: string;

  @Prop({ type: String })
  location: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const RequestBookSchema = SchemaFactory.createForClass(RequestBook);

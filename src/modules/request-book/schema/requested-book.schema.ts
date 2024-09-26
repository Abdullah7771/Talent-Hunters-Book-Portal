import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RequestBookDocument = Document & RequestBook;

@Schema({ timestamps: true })
export class RequestBook {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  subject: string;

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: String, required: true })
  grade: string;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: String, required: false })
  author?: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const RequestBookSchema = SchemaFactory.createForClass(RequestBook);

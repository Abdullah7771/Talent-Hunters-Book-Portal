import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SoldOutBookDocument = Document & SoldOutBook;

@Schema({ timestamps: true })
export class SoldOutBook {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  book: Types.ObjectId;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const SoldOutBookSchema = SchemaFactory.createForClass(SoldOutBook);

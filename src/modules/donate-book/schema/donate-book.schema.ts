import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DonateBookDocument = Document & DonateBook;

@Schema({ timestamps: true })
export class DonateBook {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: String, required: true })
  contact: string;

  @Prop({ type: String, required: true })
  location: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const DonateBookSchema = SchemaFactory.createForClass(DonateBook);

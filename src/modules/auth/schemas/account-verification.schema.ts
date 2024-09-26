import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument, Mongoose, ObjectId } from 'mongoose';
import { CodeType } from 'src/types/code';
import { Gender } from 'src/types/gender';

export type AccountVerificationDocument = HydratedDocument<AccountVerification>;

@Schema({
  timestamps: true,
})
export class AccountVerification {
  // @Prop({ type: mongoose.Schema.ObjectId })
  // id: ObjectId;

  @Prop()
  email: string;

  @Prop()
  code: string;

  @Prop()
  type: CodeType;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;

  // @Prop({ type: Date, required: true, default: new Date() })
  // createdAt: Date;

  // @Prop({
  //   type: Date,
  //   required: true,
  //   default: () => new Date(Date.now() + 5 * 60000),
  // })
  // expiresAt: Date;
}

export const AccountVerificationSchema =
  SchemaFactory.createForClass(AccountVerification);

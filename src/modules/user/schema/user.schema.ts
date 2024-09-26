import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ROLES } from 'src/types/roles';
import { AccountStatus } from 'src/types/statuses';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  username: string;

  @Prop({ type: String })
  fatherName: string;

  @Prop({ type: String })
  familyName: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  phoneNumber: string;

  @Prop({
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.USER,
  })
  accountType: ROLES;

  @Prop({
    type: String,
    enum: Object.values(AccountStatus),
    // default: AccountStatus.PENDING,
  })
  status: AccountStatus;

  @Prop([{ type: Types.ObjectId, ref: 'Book' }])
  books: Types.ObjectId[];

  @Prop([{ type: Types.ObjectId, ref: 'Book' }])
  donatedBooks: Types.ObjectId[];

  @Prop([{ type: Types.ObjectId, ref: 'Book' }])
  requestBooks: Types.ObjectId[];

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

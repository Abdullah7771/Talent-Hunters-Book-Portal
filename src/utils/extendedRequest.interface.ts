import { Request } from 'express';
import { UserDocument } from 'src/modules/user/schema/user.schema';

export interface ExtendedRequest extends Request {
  user: UserDocument;
}

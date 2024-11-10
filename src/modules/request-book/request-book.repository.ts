import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { User } from '../user/schema/user.schema';
import {
  RequestBookDocument,
  RequestBook,
} from './schema/requested-book.schema';

@Injectable()
export class RequestBookRepository extends EntityRepository<RequestBookDocument> {
  constructor(
    @InjectModel(RequestBook.name)
    private requestModel: Model<RequestBookDocument>,
  ) {
    super(requestModel);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { User } from '../user/schema/user.schema';
import { DonateBook, DonateBookDocument } from './schema/donate-book.schema';

@Injectable()
export class DonateBookRepository extends EntityRepository<DonateBookDocument> {
  constructor(
    @InjectModel(DonateBook.name)
    private donateBookModel: Model<DonateBookDocument>,
  ) {
    super(donateBookModel);
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';
import {
  Document,
  FilterQuery,
  Model,
  PopulateOptions,
  UpdateQuery,
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(private readonly entityModel: Model<T>) {}

  async findOne({
    filterQuery,
    projection,
    populateOptions,
    checkExistingOne = true,
  }: {
    filterQuery: FilterQuery<T>;
    projection?: Record<string, unknown>;
    populateOptions?: PopulateOptions | (string | PopulateOptions)[];
    checkExistingOne?: boolean;
  }): Promise<T | null> {
    try {
      let query = this.entityModel.findOne(filterQuery, {
        __v: 0,
        ...projection,
      });

      if (populateOptions) {
        query = query.populate(populateOptions);
      }
      const entity = await query.exec();
      if (checkExistingOne) {
        if (!entity) {
          throw new HttpException(
            `${this.entityModel.modelName} Not Found`,
            HttpStatus.NOT_FOUND,
          );
        }
      }

      return entity;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async find({
    filterQuery,
    projection,
    populateOptions,
    checkExistingOne = true,
    sort,
    limit,
    offset,
  }: {
    filterQuery: FilterQuery<T>;
    projection?: Record<string, unknown>;
    populateOptions?: PopulateOptions | (string | PopulateOptions)[];
    sort?: Record<string, 1 | -1>;
    checkExistingOne?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<T[] | null> {
    try {
      let query = this.entityModel.find(filterQuery, {
        __v: 0,
        ...projection,
      });
      if (populateOptions) {
        query = query.populate(populateOptions);
      }
      if (sort) {
        query = query.sort(sort);
      }
      if (limit) {
        query = query.limit(limit);
      }
      if (offset) {
        query = query.skip(offset);
      }

      const entity = await query.exec();

      if (checkExistingOne) {
        if (!entity) {
          throw new HttpException(
            `${this.entityModel.modelName} Not Found`,
            HttpStatus.NOT_FOUND,
          );
        }
      }
      return entity;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: string | any, populateOptions?: PopulateOptions) {
    try {
      let query = this.entityModel.findById(id, {
        __v: 0,
      });
      if (populateOptions) {
        query = query.populate(populateOptions);
      }
      const entity = await query.exec();

      if (!entity) {
        throw new HttpException(
          `${this.entityModel.modelName} Not Found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return entity;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(createEntityData: unknown): Promise<T> {
    try {
      const newEntity = new this.entityModel(createEntityData);

      return newEntity.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    updateQuery: UpdateQuery<unknown>,
    upsert?: boolean,
  ): Promise<T | null> {
    try {
      const entity = await this.entityModel
        .findOneAndUpdate(filterQuery, updateQuery, {
          new: true,
          upsert: upsert ?? false,
        })
        .exec();

      if (!entity) {
        throw new HttpException(
          `${this.entityModel.modelName} Not Found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return entity;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteMany(filterQuery: FilterQuery<T>) {
    try {
      const deleteResult = await this.entityModel.deleteMany(filterQuery);
      // if (deleteResult.deletedCount < 1) {
      //   throw new HttpException(
      //     `${this.entityModel.modelName} Not Found`,
      //     HttpStatus.NOT_FOUND,
      //   );
      // }
      return deleteResult.deletedCount >= 1;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteOne(filterQuery: FilterQuery<T>) {
    try {
      const deleteResult = await this.entityModel.deleteOne(filterQuery);
      if (deleteResult.deletedCount < 1) {
        throw new HttpException(
          `${this.entityModel.modelName} Not Found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return deleteResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async countDocuments(filterQuery: FilterQuery<T>) {
    try {
      const count = await this.entityModel.countDocuments(filterQuery);
      return count;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

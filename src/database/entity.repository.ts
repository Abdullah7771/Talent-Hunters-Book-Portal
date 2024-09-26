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

  async findOne(
    filterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    try {
      const entity = await this.entityModel
        .findOne(filterQuery, {
          _v: 0,
          ...projection,
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

  async findOneWithPopulate(
    filterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    populateOptions?: PopulateOptions | (string | PopulateOptions)[],
    sort?: Record<string, 1 | -1 | 'desc' | 'asc'>,
  ): Promise<T | null> {
    try {
      let query = this.entityModel.findOne(filterQuery, {
        __v: 0,
        ...projection,
      });
      console.log(populateOptions, 'options');

      if (populateOptions) {
        query = query.populate(populateOptions);
      }
      if (sort) {
        query = query.sort(sort);
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

  async findWithPopulate(
    filterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    populateOptions?: PopulateOptions | (string | PopulateOptions)[],
    sort?: Record<string, 1 | -1>,
  ): Promise<T[] | null> {
    try {
      let query = this.entityModel.find(filterQuery, {
        _v: 0,
        ...projection,
      });

      if (populateOptions) {
        query = query.populate(populateOptions);
      }
      if (sort) {
        query = query.sort(sort);
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

  async checkExistingOne(
    filterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    try {
      const entity = await this.entityModel
        .findOne(filterQuery, { _v: 0, ...projection })
        .exec();

      if (entity) {
        throw new HttpException(
          `${this.entityModel.modelName} Already Exists`,
          HttpStatus.NOT_FOUND,
        );
      }
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async find(
    filterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    sort?: Record<string, 1 | -1>,
  ): Promise<T[] | null> {
    try {
      const entity = await this.entityModel
        .find(filterQuery, { _v: 0, ...projection })
        .sort(sort)
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

  async findById(id: string | any) {
    try {
      const entity = await this.entityModel.findById(id).exec();

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
}

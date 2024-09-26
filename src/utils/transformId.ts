import { ObjectId, Types } from 'mongoose';

export const transformObjectId = (id: string) => {
  console.log(id);

  return new Types.ObjectId(id);
};

export const transformArrObjectIds = (ids: string[] | any) => {
  const objectIds = ids.map((id) => new Types.ObjectId(id));
  return objectIds;
};

// transformObjectId('66cc79d590c74b6599c93498');

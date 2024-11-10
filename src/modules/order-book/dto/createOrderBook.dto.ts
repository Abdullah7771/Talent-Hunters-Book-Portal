import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
export class CreateOrderBookDto {
  @ApiProperty({
    description: 'Book ID that was ordered',
    example: '607d2f3f6c4f8c001f6478ba',
  })
  @IsMongoId()
  @IsNotEmpty()
  bookId: string | Types.ObjectId;
}

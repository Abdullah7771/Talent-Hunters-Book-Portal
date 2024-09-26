import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateSoldOutBookDto {
  @ApiProperty({
    description: 'Book ID that was sold out',
    example: '607d2f3f6c4f8c001f6478ba',
  })
  @IsMongoId()
  @IsNotEmpty()
  bookId: string;
}

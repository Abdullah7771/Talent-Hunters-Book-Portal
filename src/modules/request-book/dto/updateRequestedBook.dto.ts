import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength, IsNumber } from 'class-validator';

export class UpdateRequestBookDto {
  @ApiProperty({
    description: 'Title of the book',
    example: 'The Great Gatsby',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  title?: string;

  @ApiProperty({
    description: 'Subject of the book',
    example: 'Literature',
    required: false,
  })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiProperty({
    description: 'Status of the book (e.g., requested, available)',
    example: 'requested',
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Grade level associated with the book',
    example: '5th Grade',
    required: false,
  })
  @IsString()
  @IsOptional()
  grade?: string;

  @ApiProperty({
    description: 'Quantity of the book',
    example: 5,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @ApiProperty({
    description: 'Author of the book',
    example: 'F. Scott Fitzgerald',
    required: false,
  })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({
    description: 'Description of the book',
    example: 'A classic novel about the American Dream.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

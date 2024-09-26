import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  MaxLength,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { IsArrayOfUrls } from 'src/decorators/isArrayURL.decorator';

export class UpdateBookDto {
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
    description: 'Status of the book (e.g., available, checked out)',
    example: 'available',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  status?: string;

  @ApiProperty({
    description: 'Grade level of the book',
    example: '5th Grade',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  grade?: string;

  @ApiProperty({
    description: 'Number of copies of the book',
    example: 10,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  count?: number;

  @ApiProperty({
    description: 'Author of the book',
    example: 'F. Scott Fitzgerald',
    required: false,
  })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({
    description: 'Array of image URLs for the book cover',
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    required: false,
  })
  @IsArray()
  @IsArrayOfUrls({ message: 'Each element of the array must be a valid URL' })
  @ArrayNotEmpty()
  @IsOptional()
  images?: string[];
}

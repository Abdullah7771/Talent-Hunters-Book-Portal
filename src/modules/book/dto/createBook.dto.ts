import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  MaxLength,
  IsEnum,
  IsUrl,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { IsArrayOfUrls } from 'src/decorators/isArrayURL.decorator';
import { Trim } from 'src/decorators/trim.decorator'; // Custom decorator if needed

export class CreateBookDto {
  @ApiProperty({
    description: 'Title of the book',
    example: 'The Great Gatsby',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiProperty({
    description: 'Subject of the book',
    example: 'Literature',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    description: 'Status of the book (e.g., available, checked out)',
    example: 'available',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'Grade level of the book',
    example: 'KG2',
  })
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  grade: string;

  @ApiProperty({
    description: 'Number of copies of the book',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  count: number;

  @ApiProperty({
    description: 'Author of the book',
    example: 'F. Scott Fitzgerald',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: 'Image URL of the book cover',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsNotEmpty()
  @IsArray()
  @IsUrl()
  images: string[];
}

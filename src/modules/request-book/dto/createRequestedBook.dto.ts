import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateRequestBookDto {
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
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    description: 'Status of the book (e.g., requested, available)',
    example: 'requested',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'Grade level associated with the book',
    example: '5th Grade',
  })
  @IsString()
  @IsNotEmpty()
  grade: string;

  @ApiProperty({
    description: 'Quantity of the book',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

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

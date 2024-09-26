import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateDonateBookDto {
  @ApiProperty({
    description: 'Quantity of the donated books',
    example: 10,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @ApiProperty({
    description: 'Contact information of the donor',
    example: 'John Doe - john.doe@example.com',
    required: false,
  })
  @IsString()
  @IsOptional()
  contact?: string;

  @ApiProperty({
    description: 'Location where the books are located',
    example: '123 Elm Street, Springfield',
    required: false,
  })
  @IsString()
  @IsOptional()
  location?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateDonateBookDto {
  @ApiProperty({
    description: 'Quantity of the donated books',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: 'Contact information of the donor',
    example: 'John Doe - john.doe@example.com',
  })
  @IsString()
  @IsNotEmpty()
  contact: string;

  @ApiProperty({
    description: 'Location where the books are located',
    example: '123 Elm Street, Springfield',
  })
  @IsString()
  @IsNotEmpty()
  location: string;
}

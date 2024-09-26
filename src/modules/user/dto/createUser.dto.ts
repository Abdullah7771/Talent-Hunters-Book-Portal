import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
  IsNotEmpty,
} from 'class-validator';
import { ROLES } from 'src/types/roles';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Father’s name of the user',
    example: 'Robert Doe',
  })
  @IsString()
  @IsNotEmpty()
  fatherName: string;

  @ApiProperty({
    description: 'Family name of the user',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  familyName: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Address of the user',
    example: '123 Main St, Anytown, USA',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'Account type of the user',
    enum: ROLES,
    example: ROLES.USER,
  })
  @IsEnum(ROLES)
  @IsNotEmpty()
  accountType: ROLES;

  @ApiProperty({
    description: 'Array of book IDs associated with the user',
    type: [String],
    example: ['60d2e9b16f8c3c001c9e4e76'],
    required: false,
  })
  @IsArray()
  @IsOptional()
  books?: string[];

  @ApiProperty({
    description: 'Array of donated book IDs',
    type: [String],
    example: ['60d2e9b16f8c3c001c9e4e76'],
    required: false,
  })
  @IsArray()
  @IsOptional()
  donatedBooks?: string[];

  @ApiProperty({
    description: 'Array of requested book IDs',
    type: [String],
    example: ['60d2e9b16f8c3c001c9e4e76'],
    required: false,
  })
  @IsArray()
  @IsOptional()
  requestBooks?: string[];
}

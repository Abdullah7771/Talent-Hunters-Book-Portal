import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Trim } from 'src/decorators/trim.decorator';
import { ROLES } from 'src/types/roles';

export class LoginDTO {
  @ApiProperty({ type: 'enum', enum: ROLES, example: 'mobileUser' })
  @IsNotEmpty()
  @IsString()
  @Trim()
  @IsEnum(ROLES, {
    message: 'Invalid User Role. Must be one of: mobileUser, admin',
  })
  role: ROLES;

  @ApiProperty({ example: 'john@wick.com' })
  @IsNotEmpty()
  @IsEmail()
  @Trim()
  email: string;

  @ApiProperty({ example: 'Password123!' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Trim()
  password: string;
}

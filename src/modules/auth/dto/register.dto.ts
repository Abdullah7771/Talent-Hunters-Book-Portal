import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { Match } from 'src/decorators/match.decorator';
import { Trim } from 'src/decorators/trim.decorator';
import { ROLES } from 'src/types/roles';

export class RegisterDTO {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @Trim()
  email: string;

  @ApiProperty({
    description: ' Password of the user',
    example: 'Password123!',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Matches(/^(?=.*[A-Z])(?=.*\W).{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain at least 1 uppercase letter, and 1 symbol',
  })
  password: string;

  @ApiProperty({
    description: ' Password of the user',
    example: 'Password123!',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Matches(/^(?=.*[A-Z])(?=.*\W).{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain at least 1 uppercase letter, and 1 symbol',
  })
  @Match('password', {
    message: 'Confirm passsword should be same as new Password',
  })
  confirmPassword: string;

  @ApiProperty({ example: 'mobileUser' })
  @IsNotEmpty()
  @Trim()
  @IsEnum(ROLES, {
    message: 'Invalid User Role. Must be one of: mobileUser, admin',
  })
  role: ROLES;
}

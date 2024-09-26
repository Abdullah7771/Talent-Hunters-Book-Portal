import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateIf,
  NotEquals,
} from 'class-validator';
import { Match } from 'src/decorators/match.decorator';
export class ChangePasswordDTO {
  @ApiProperty({
    description: 'Current password of the user',
    example: 'CurrentPassword123!',
  })
  @IsNotEmpty({ message: 'Current password cannot be empty' })
  currentPassword: string;

  @ApiProperty({
    description: 'New Password of the user',
    example: 'Password123!',
  })
  @IsNotEmpty({ message: 'New password cannot be empty' })
  @Matches(/^(?=.*[A-Z])(?=.*\W).{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain at least 1 uppercase letter, and 1 symbol',
  })
  newPassword: string;

  @ApiProperty({
    description: 'Same as New Password',
    example: 'Password123!',
  })
  @IsNotEmpty({ message: 'New password cannot be empty' })
  @Match('newPassword', {
    message: 'Confirm passsword should be same as new Password',
  })
  confirmPassword: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';
import { Trim } from 'src/decorators/trim.decorator';

export class ResetPasswordDTO {
  @ApiProperty({ example: 'Password123!' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\W).{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain at least 1 uppercase letter, and 1 symbol',
  })
  newPassword: string;

  @ApiProperty({ example: 'Password123!' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\W).{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain at least 1 uppercase letter, and 1 symbol',
  })
  @Match('newPassword', {
    message: 'Confirm passsword should be same as new Password',
  })
  confirmPassword: string;
}

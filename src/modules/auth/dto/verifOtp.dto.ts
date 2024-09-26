import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { CodeType } from 'src/types/code';

export class VerifyOtpDTO {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '000000' })
  @IsNotEmpty()
  OTP: string;

  @ApiProperty({
    type: 'enum',
    enum: CodeType,
    example: 'Account Verification',
  })
  @IsEnum(CodeType)
  type: CodeType;
}

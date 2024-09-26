import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class EmailDTO {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail()
  email: string;
}

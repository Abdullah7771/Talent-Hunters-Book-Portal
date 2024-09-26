import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class nodeMailerDto {
  @IsNotEmpty()
  @IsEmail()
  to: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  constructor(to: string, subject: string, text: string) {
    this.to = to;
    this.subject = subject;
    this.text = text;
  }
}

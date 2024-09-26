import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { nodeMailerDto } from './dto/nodeMailer.dto';

@Injectable()
export class MailService {
  constructor() {}

  /**
   * @description This function sends an email using Nodemailer based on the provided email details.
   *
   * @param {nodeMailerDto} nodemailerDto - The DTO containing the email details such as recipient, subject, and message text.
   *
   * @returns {Promise<any>}promise that resolves to the result of sending the email through Nodemailer.
   *
   * @throws {HttpException} Throws a Bad Request HTTP exception if there's an error while sending the email.
   */

  async sendEmailThroughNodeMailer(nodemailerDto: nodeMailerDto): Promise<any> {
    try {
      var nodemailer = require('nodemailer');

      const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: nodemailerDto.to,
        subject: nodemailerDto.subject,
        text: nodemailerDto.text,
      };

      let res = await transporter.sendMail(mailOptions);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

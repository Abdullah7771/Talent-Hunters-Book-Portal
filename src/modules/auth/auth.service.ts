import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schema/user.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtUserService } from '../jwt/jwt.user.service';
import { LoginDTO } from './dto/login.dto';
import { AccountStatus } from 'src/types/statuses';
import { MailService } from '../mail/mail.service';
import {
  AccountVerification,
  AccountVerificationDocument,
} from './schemas/account-verification.schema';
import { comparePassword, hashPassword } from 'src/utils/bcrypt.service';
import { ResetPasswordDTO } from './dto/resetPassword.dto';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import { ROLES } from 'src/types/roles';
import { VerifyOtpDTO } from './dto/verifOtp.dto';
import { CodeType } from 'src/types/code';
import { nodeMailerDto } from '../mail/dto/nodeMailer.dto';
import { CreateUserDto } from '../user/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtUserService: JwtUserService,
    private readonly mailService: MailService,
    @InjectModel(AccountVerification.name)
    private accountVerificationModel: Model<AccountVerificationDocument>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userService.findUser({
        filterQuery: {
          email: createUserDto.email,
        },
      });
      if (existingUser) {
        throw new HttpException(
          'User with this email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = await hashPassword(createUserDto.password, 12);
      createUserDto.password = hashedPassword;

      // const otp = await this.otpGenerationWithExpiry(
      //   createUserDto.email,
      //   CodeType.ACCOUNT_VERIFICATION,
      // );
      // console.log(otp, 'otp');
      // const emailDto = new nodeMailerDto(
      //   createUserDto.email,
      //   CodeType.ACCOUNT_VERIFICATION,
      //   otp.code,
      // );

      // this.mailService.sendEmailThroughNodeMailer(emailDto);

      const createdUser = await this.userService.create({
        ...createUserDto,
      });

      console.log(createdUser, 'createdUser');

      const token = await this.jwtUserService.generateAuthToken({
        email: createdUser.email,
        id: createdUser._id,
        role: createdUser.role,
      });

      delete createdUser.password;
      delete createdUser.role;

      return {
        access_token: token,
        user: createdUser,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginDto: LoginDTO) {
    try {
      let existingUser = (await this.userService.findUser({
        filterQuery: {
          email: loginDto.email,
          role: loginDto.email,
        },
      })) as UserDocument;

      if (!existingUser) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const isPasswordValid = await comparePassword({
        inputPassword: loginDto.password,
        userPassword: existingUser.password,
      });
      existingUser;

      if (!isPasswordValid) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      if (existingUser.status == AccountStatus.DISABLE) {
        throw new HttpException(
          'Account is Disabled, Contact Admin',
          HttpStatus.FORBIDDEN,
        );
      }
      // if (existingUser.status == AccountStatus.PENDING) {
      //   this.sendOtp(existingUser.email, CodeType.ACCOUNT_VERIFICATION);
      //   return {
      //     user: existingUser,
      //   };
      // }
      const token = await this.jwtUserService.generateAuthToken({
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.role,
      });

      delete existingUser.password;

      return {
        access_token: token,
        user: existingUser,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async otpGenerationWithExpiry(email: string, type: CodeType) {
    try {
      const existingOtpCodes = await this.accountVerificationModel
        .deleteMany({
          email,
          type,
        })
        .exec();

      console.log('existing code', existingOtpCodes);

      const randomNumber = Math.floor(Math.random() * 10000);

      const otpCode = String(randomNumber).padStart(6, '0');

      const createdOtpCode = new this.accountVerificationModel({
        code: otpCode,
        email,
        type,
      });
      console.log(createdOtpCode, 'created');

      return await createdOtpCode.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async sendOtp(email: string, type: CodeType) {
    try {
      const user = await this.userService.findUser({
        filterQuery: {
          email,
        },
      });
      if (user.role !== ROLES.USER) {
        throw new HttpException('Invalid Email', HttpStatus.BAD_REQUEST);
      }
      if (
        user.status != AccountStatus.PENDING &&
        type == CodeType.ACCOUNT_VERIFICATION
      ) {
        throw new HttpException(
          'Account already verified',
          HttpStatus.BAD_REQUEST,
        );
      }
      const otp = await this.otpGenerationWithExpiry(email, type);

      console.log(otp, 'sdads');
      const emailDto = new nodeMailerDto(email, type, otp.code);

      await this.mailService.sendEmailThroughNodeMailer(emailDto);
      return {
        message: 'Code Sent',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async resendOtp(email: string, type: CodeType) {
    try {
      const user = await this.userService.findUser({
        filterQuery: {
          email,
        },
      });
      if (user.role !== ROLES.USER) {
        throw new HttpException('Invalid Email', HttpStatus.BAD_REQUEST);
      }

      if (
        user.status != AccountStatus.PENDING &&
        type == CodeType.ACCOUNT_VERIFICATION
      ) {
        throw new HttpException(
          'Account already verified',
          HttpStatus.BAD_REQUEST,
        );
      }
      const existingOtpCodes = await this.accountVerificationModel
        .findOne({
          email,
          type,
        })
        .exec();
      if (!existingOtpCodes) {
        throw new HttpException(
          'No OTP code found for this email. Please request a new OTP before attempting to resend.',
          400, // Bad Request
        );
      }
      const otp = await this.otpGenerationWithExpiry(email, type);

      console.log(otp, 'sdads');
      const emailDto = new nodeMailerDto(email, type, otp.code);

      await this.mailService.sendEmailThroughNodeMailer(emailDto);
      return {
        message: 'Code Sent',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async checkOtpExpiration(data: {
    email: string;
    OTP: string;
    type: CodeType;
  }) {
    try {
      const otp = await this.accountVerificationModel.findOne({
        email: data.email,
        code: data.OTP,
        type: data.type,
      });

      console.log(otp, 'otp');

      if (!otp) {
        throw new HttpException('Invalid Code', HttpStatus.NOT_FOUND);
      }

      const expiryDate = new Date(otp.createdAt);

      // Add 5 minutes (5 * 60 * 1000 milliseconds)
      expiryDate.setTime(expiryDate.getTime() + 5 * 60 * 1000);

      const date = new Date();

      if (expiryDate < date) {
        throw new HttpException('Code expired.!', HttpStatus.GONE);
      }

      console.log(otp.createdAt);

      return false;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async verifyOtp({ email, OTP, type }: VerifyOtpDTO) {
    try {
      let user = await this.userService.findUser({
        filterQuery: {
          email,
        },
      });

      if (
        user.status != AccountStatus.PENDING &&
        type == CodeType.ACCOUNT_VERIFICATION
      ) {
        throw new HttpException(
          'Account already verified',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.checkOtpExpiration({
        email,
        OTP,
        type,
      });
      if (type == CodeType.ACCOUNT_VERIFICATION) {
        user.status = AccountStatus.IN_COMPLETE;

        await user.save();
      }
      const token = await this.jwtUserService.generateAuthToken({
        email: user.email,
        id: user._id,
        role: user.role,
      });
      return {
        user,
        access_token: token,
        message: 'Successfull',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDTO, user: UserDocument) {
    try {
      if (user.status == AccountStatus.DISABLE) {
        throw new HttpException(
          'Your account is disabled. Contact Admin',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (user.status == AccountStatus.PENDING) {
        throw new HttpException(
          'Verify your account first before resetting password.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await hashPassword(
        resetPasswordDto.newPassword,
        12,
      );
      user.password = hashedPassword;

      await user.save();

      console.log(user, 'user');

      return {
        message: 'Password Reset Successful !',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async changePassword(
    { currentPassword, newPassword }: ChangePasswordDTO,
    user: UserDocument,
  ) {
    try {
      console.log('user', user._id);
      const isPasswordMatched = await comparePassword({
        inputPassword: currentPassword,
        userPassword: user.password,
      });

      if (!isPasswordMatched) {
        throw new HttpException(
          'Invalid current password',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const hashedPassword = await hashPassword(newPassword);
      user.password = hashedPassword;

      // await this.userService.updateUser({
      //   email: user.email,
      //   updateUser: { password: hashedPassword },
      // });
      await user.save();
      return {
        message: 'Password Updated !',
      };

      // const hashedNewPassword = await hashPassword(newPassword, 12);
      // updateUser.password = hashedNewPassword;

      // await updateUser.save();
      // return updateUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

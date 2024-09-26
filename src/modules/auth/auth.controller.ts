import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { ResetPasswordDTO } from './dto/resetPassword.dto';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import { JwtUserGuard } from 'src/guards/jwt-user.guard';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/role.guard';
import { HasRoles } from 'src/guards/roles.decorator';
import { ROLES } from 'src/types/roles';
import { VerifyOtpDTO } from './dto/verifOtp.dto';
import { EmailDTO } from './dto/email.dto';
import { ExtendedRequest } from 'src/utils/extendedRequest.interface';
import { CodeType } from 'src/types/code';
import { CreateUserDto } from '../user/dto/createUser.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Register a new User

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiBody({
    type: RegisterDTO,
    schema: {
      example: {
        email: 'johndoe@test.com',

        password: 'password',
        role: 'mobileUser',
        confirPassword: 'password',
      },
    },
  })
  @Post('register')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() data: CreateUserDto) {
    return await this.authService.register({ ...data });
  }

  // Login a new User
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logs in user and returns JWT token with user details',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  @ApiBody({
    type: LoginDTO,
    schema: {
      example: {
        email: 'johndoe@test.com',
        password: 'password',
      },
    },
  })
  @Post('login')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: LoginDTO) {
    return await this.authService.login({ ...data });
  }

  // Sent otp to email

  @ApiExcludeEndpoint()
  @ApiBearerAuth('jwt')
  @UseGuards(JwtUserGuard, RolesGuard)
  @HasRoles(ROLES.USER)
  @ApiOperation({ summary: 'Sent OTP to the email' })
  @ApiBody({
    type: String,
    schema: {
      example: {
        email: 'johndoe@test.com',
      },
    },
  })
  @Post('/send-verification-code')
  @UsePipes(ValidationPipe)
  async sendVerificationCode(@Body() { email }: EmailDTO) {
    return await this.authService.sendOtp(email, CodeType.ACCOUNT_VERIFICATION);
  }

  // Resend otp to email

  // @ApiBearerAuth('jwt')
  // @UseGuards(JwtUserGuard, RolesGuard)
  // @HasRoles(ROLES.USER)
  @ApiOperation({ summary: 'Resend OTP to the email' })
  @ApiBody({
    type: String,
    schema: {
      example: {
        email: 'johndoe@test.com',
      },
    },
  })
  @Post('/resend-verification-code')
  @UsePipes(ValidationPipe)
  async resendVerificationCode(@Body() { email }: EmailDTO) {
    return await this.authService.resendOtp(
      email,
      CodeType.ACCOUNT_VERIFICATION,
    );
  }

  // Verify otp to email
  // @ApiBearerAuth('jwt')
  // @UseGuards(JwtUserGuard, RolesGuard)
  // @HasRoles(ROLES.USER)
  @ApiOperation({ summary: 'Verify OTP sent to the email' })
  @ApiBody({
    type: VerifyOtpDTO,
    schema: {
      example: {
        email: 'johndoe@test.com',
        OTP: '000000',
      },
    },
  })
  @Post('/verify-code')
  @UsePipes(ValidationPipe)
  async verifyCode(@Body() data: VerifyOtpDTO) {
    return await this.authService.verifyOtp(data);
  }

  // send forgot password otp to email
  @ApiOperation({ summary: 'Sent OTP to the email' })
  @ApiBody({
    type: String,
    schema: {
      example: {
        email: 'johndoe@test.com',
      },
    },
  })
  @Post('/forgot-password-code')
  @UsePipes(ValidationPipe)
  async forgotPasswordCode(@Body() { email }: EmailDTO) {
    return await this.authService.sendOtp(email, CodeType.FORGOT_PASSWORD);
  }

  // resend forgot password otp to email
  @ApiOperation({ summary: 'Resent OTP to the email' })
  @ApiBody({
    type: String,
    schema: {
      example: {
        email: 'johndoe@test.com',
      },
    },
  })
  @Post('/resend-forgot-password-code')
  @UsePipes(ValidationPipe)
  async forgotPasswordCodeResend(@Body() { email }: EmailDTO) {
    return await this.authService.resendOtp(email, CodeType.FORGOT_PASSWORD);
  }

  // reset   password
  @ApiBearerAuth('jwt')
  @UseGuards(JwtUserGuard, RolesGuard)
  @HasRoles(ROLES.USER)
  @ApiOperation({ summary: 'Reset Password' })
  @ApiBody({
    type: ResetPasswordDTO,
    schema: {
      example: {
        email: 'johndoe@test.com',
        OTP: '0038883',
        newPassword: 'Password123!',
      },
    },
  })
  @Post('/reset-password')
  @UsePipes(ValidationPipe)
  async resetPassword(
    @Req() req: ExtendedRequest,
    @Body() resetPasswordDto: ResetPasswordDTO,
  ) {
    return await this.authService.resetPassword(resetPasswordDto, req?.user);
  }

  // change   password
  @ApiBearerAuth('jwt')
  @UseGuards(JwtUserGuard, RolesGuard)
  @HasRoles(ROLES.USER)
  @ApiOperation({ summary: 'Change Password' })
  @Post('/change-password')
  @UsePipes(ValidationPipe)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDTO,
    @Req() req: Request,
  ) {
    const user = (req as any).user;

    return await this.authService.changePassword(changePasswordDto, user);
  }
}

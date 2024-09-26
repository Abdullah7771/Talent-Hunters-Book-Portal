import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  AccountVerification,
  AccountVerificationSchema,
} from './schemas/account-verification.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '../jwt/jwt.module';
import { User, UserSchema } from '../user/schema/user.schema';
import { MailModule } from '../mail/mail.module';
import { JwtUserStrategy } from 'src/strategies/jwt-user.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountVerification.name, schema: AccountVerificationSchema },
      { name: User.name, schema: UserSchema },
    ]),
    MailModule,
    UserModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtUserStrategy],
})
export class AuthModule {}

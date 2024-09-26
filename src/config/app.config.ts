import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  timezone: process.env.TZ,
  environment: process.env.NODE_ENV,
  port: process.env.APP_PORT || 8080,
  secretKey: process.env.SECRET_KEY,

  //   adminSecret: process.env.ADMIN_SECRET_KEY,
  //   temporarySecret: process.env.TEMPORARY_SECRET_KEY,
  expiry: process.env.EXPIRES_IN,
  database_uri: process.env.MONGO_URI,
  //   otpExpiry: process.env.OTP_EXPIRES_IN,
  //   magicLinkSecret: process.env.MAGIC_LINK_KEY,
  //   magicLinkExpiry: process.env.LINK_EXPIRES_IN,
}));

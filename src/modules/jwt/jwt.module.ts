import { Module } from '@nestjs/common';
import { JwtUserService } from './jwt.user.service';
import { JwtController } from './jwt.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [JwtUserService, JwtService],
  controllers: [JwtController],
  exports: [JwtUserService],
})
export class JwtModule {}

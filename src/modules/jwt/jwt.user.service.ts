import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import mongoose, { ObjectId, Types } from 'mongoose';
import { ROLES } from 'src/types/roles';

@Injectable()
export class JwtUserService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateAuthToken(payload: {
    id: string | Types.ObjectId | ObjectId;
    email: string;
    role: ROLES;
  }) {
    console.log(payload, 'payload');

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('app.secretKey'),
      expiresIn: Number(this.configService.get<number>('app.expiry')),
    });
  }

  decodeAuthToken(token: string) {
    return this.jwtService.decode(token);
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/schema/user.schema';
import { JWT } from 'src/types/jwt';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'jwt-user') {
  constructor(
    configService: ConfigService,
    private readonly usersService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('app.secretKey'),
      ignoreExpiration: false,
    });
  }
  async validate({ id }: JWT): Promise<User> {
    console.log('----inside strategy');

    return await this.usersService.findById(id);
  }
}

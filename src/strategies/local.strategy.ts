// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-local';
// import { UserAuthService } from '../auth.service';
// import { JWTResponse } from '../types';
// import { ROLES } from 'src/types/enums/roles';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: UserAuthService) {
//     super({ usernameField: 'email' });
//   }
//   async validate(
//     email: string,
//     password: string,
//     role: ROLES,
//   ): Promise<JWTResponse> {
//     const user = await this.authService.login({ email, password, role });
//     return user;
//   }
// }

import { User } from 'src/modules/user/schema/user.schema';
import { AccountStatus } from './statuses';
import { ROLES } from './roles';
import mongoose from 'mongoose';

export interface JWT {
  id: string;
  email: string;
}

export interface JWTResponse {
  accessToken?: string;
  user?:
    | User
    | {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: ROLES;
        status: AccountStatus;
      };
}

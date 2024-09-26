import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES } from 'src/types/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<ROLES[]>('roles', [
      context.getHandler(),
    ]);

    if (!roles) return true;

    const { user } = context.switchToHttp().getRequest();
    const hasRole = () => roles.includes(user.role);

    if (user && user.role && hasRole()) {
      return true;
    }
    throw new HttpException(
      'You do not have permission for this API',
      HttpStatus.UNAUTHORIZED,
    );
  }
}

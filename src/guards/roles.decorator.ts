import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'src/types/roles';

export const HasRoles = (...roles: ROLES[]) => SetMetadata('roles', roles);

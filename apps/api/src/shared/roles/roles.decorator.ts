import { SetMetadata } from '@nestjs/common';
import { Roles } from '../../types/index.types';

export const HasRoles = (...roles: Roles[]) => SetMetadata('roles', roles);

import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';

export const ROLE_METADATA = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_METADATA, roles);

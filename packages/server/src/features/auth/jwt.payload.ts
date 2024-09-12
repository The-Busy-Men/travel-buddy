import { UUID } from 'crypto';
import { UserRoles } from 'src/entities/utils/role.types';

export interface JwtPayload {
  email: string;
  id: UUID;
  roles: UserRoles[];
}

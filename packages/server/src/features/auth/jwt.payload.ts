import { UUID } from 'crypto';
import { UserRoles } from 'src/entities/utils/role.types';

export interface JwtPayload {
  email: string;
  id: UUID; // Adjust type based on your user ID type
  roles: UserRoles[];
}

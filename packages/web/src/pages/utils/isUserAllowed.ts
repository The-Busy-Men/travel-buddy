import { UUID } from 'crypto';
import * as jwtDecode from 'jwt-decode';

export enum UserRoles {
  user = 'user',
  moderator = 'moderator',
  admin = 'admin',
  super_admin = 'super_admin',
}

interface userAllowedProps {
  requiredRoles: UserRoles[];
}

export interface JwtPayload {
  email: string;
  id: UUID;
  roles: UserRoles[];
}

export const isUserAllowed = ({ requiredRoles }: userAllowedProps): boolean => {
  const token = localStorage.getItem('access_token');
  if (!token) return false;

  try {
    // Decode the JWT to extract the payload
    const decodedToken: JwtPayload = jwtDecode.jwtDecode(token);

    // Check if the user has at least one required role
    return requiredRoles.some((role) => decodedToken.roles.includes(role));
  } catch (error) {
    console.error('Failed to decode or process the token', error);
    return false; // Return false if there’s an error in decoding
  }
};
